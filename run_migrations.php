<?php

    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', dirname(__FILE__));

    //Autoload classes 
    require_once(ROOT . DS . 'core' . DS .'autoload.php');


    //load configuration
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();

    // load configuration and helper functions
    require_once(ROOT . DS . 'config' . DS . 'config.php');
    
    $isCli = php_sapi_name() == 'cli';

    use Core\DB;

    $db = DB::getInstance();

    $migrationTable = $db->query("SHOW TABLES LIKE 'migrations'")->results();
    $previousMigs = [];
    $migrationsRun = [];

    if (!empty($migrationTable)) {
        $query = $db->query("SELECT migration FROM migrations")->results();
        foreach ($query as $q) {
            $previousMigs[] = $q->migration;
        }
    }
        // get all files
    $migrations = glob('migrations'.DS.'*.php');

    foreach ($migrations as $fileName) {
        $klass = str_replace('migrations'.DS,'',$fileName);
        $klass = str_replace('.php','',$klass);
        if (!in_array($klass,$previousMigs)) {
            $klassNamespace = 'Migrations\\'.$klass;
            $mig = new $klassNamespace($isCli);
            $mig->up();
            $db->insert('migrations',['migration'=>$klass]);
            $migrationsRun[] = $klassNamespace;
        }
    }

    if (sizeof($migrationsRun) == 0) {
        if ($isCli) {
            echo "\e[0;37;42m\n\n"."    No new migrations to run.\n\e[0m\n";
        } else {
            echo '<p style="color:#006600;">No new migrations to run.</p>';
        }
    }