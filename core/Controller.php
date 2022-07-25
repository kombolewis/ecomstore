<?php

namespace Core;

class Controller
{
    protected $_controller;
    protected $_action;
    public $view;
    private $app;

    public function __construct($controller, $action)
    {
        $this->_controller = $controller;
        $this->_action = $action;
        $this->view = new View();
        $this->app = Application::$app;
    }

    protected function load_model($model)
    {
        $modelPath = 'App\Models\\' . $model;
        if (\class_exists($modelPath)) {
            $this->{$model.'Model'} = new $modelPath(\strtolower($model));
        }
    }

    public function jsonResp($resp)
    {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code(200);
        echo \json_encode($resp);
        exit;
    }

    public function render($view, $params=[])
    {
        $this->view->render($view, $params);
    }


    public function get(string $input = null)
    {
        return $this->app->request->get($input);
    }

    public function redirect($path)
    {
        $this->app->router->redirect($path);
    }

    public function csrfCheck()
    {
        $this->app->request->csrfCheck();
    }
}
