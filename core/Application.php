<?php

namespace Core;

use Core\{Router,Request};

class Application
{
    public static $app;
    /**
     * @var Router
     */
    public Router $router;

    /**
     * @var Request
     */
    public Request $request;

    /**
     * the view instance
     *
     * @var [type]
     */
    public $view;

    /**
     * main class constructor
     */
    public function __construct()
    {
        $this->request = new Request();
        $this->view = new View();
        $this->router = new Router($this->request);
        self::$app = $this;
        $this->make();
    }

    /**
     * return the server response to client
     *
     * @return void
     */
    public function run()
    {
        echo $this->router->resolve();
    }

    private function make()
    {
        $this->reporting();
        $this->headers();
    }

    private function headers()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-Requested-With");
    }

    private function reporting()
    {
        if (DEBUG) {
            error_reporting(E_ALL);
            ini_set('display_errors', '1');
        } else {
            error_reporting(0);
            ini_set('display_errors', '0');
            ini_set('log_errors', '1');
            ini_set('error_log', ROOT . DS . 'tmp' . DS . 'logs' . DS . 'errors.log');
        }
    }
}
