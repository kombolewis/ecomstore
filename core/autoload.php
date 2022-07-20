<?php

require_once(ROOT . DS . 'vendor' . DS .'autoload.php');

function autoload($className)
{
    $classAry = explode('\\', $className);
    $class = array_pop($classAry);
    $subPath = strtolower(implode(DS,$classAry));
    $path = ROOT . DS . $subPath . DS . $class . '.php';
    if (file_exists($path)) {
        require_once($path);
    }
}

spl_autoload_register('autoload');