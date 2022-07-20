<?php

    if (php_sapi_name() != 'cli') die('Restricted');

    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', dirname(__FILE__));

    // load configuration and helper functions
    require_once(ROOT . DS . 'config' . DS . 'config.php');

    //Autoload classes 
    require_once(ROOT . DS . 'core' . DS .'autoload.php');

    use Seed\Seeder;
    
    $flags = getopt("r:");

    $records = (int) $flags["r"];

    if ($records == 0) die("Please provide number greater than 0");
    

    $seeder = new Seeder;

    $seeder->truncate();

    foreach (range(1, $records) as $i) {
        $seeder->seed();
    }


