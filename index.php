<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__file__));

//Autoload classes 
require_once(ROOT . DS . 'core' . DS .'autoload.php');

//load configuration
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

//load application configuration
require_once(ROOT . DS . 'config' . DS . 'config.php');

session_start();

use App\Controllers\ProductListController;
use App\Controllers\AddProductController;
use App\Controllers\AjaxController;

$app = new Core\Application();

$app->router->get('/', [ProductListController::class, 'index']);
$app->router->get('/add-product', [AddProductController::class, 'create']);
$app->router->post('/add-product', [AddProductController::class, 'store']);
$app->router->post('/delete-items', [ProductListController::class, 'delete']);
$app->router->post('/validate-unique', [AjaxController::class, 'index']);

$app->run();