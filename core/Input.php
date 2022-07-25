<?php

namespace Core;

use Core\FH;

class Input
{
    public function isPost()
    {
        return $this->getRequestMethod() === 'POST';
    }

    public function isPut()
    {
        return $this->getRequestMethod() === 'PUT';
    }

    public function isGet()
    {
        return $this->getRequestMethod() === 'GET';
    }

    public function getRequestMethod()
    {
        return strtoupper($_SERVER['REQUEST_METHOD']);
    }

    public static function get($input = false)
    {
        if (!$input) {
            $data = [];
            foreach ($_REQUEST as $field => $value) {
                $data[$field] = $value;
            }
            return $data;
        }
        return FH::sanitize($_REQUEST[$input]);
    }

    public function csrfCheck()
    {
        if (!FH::checkToken($this->get('csrf_token'))) {
            Application::$app->router->redirect('restricted/badToken');
        }
        return true;
    }
}
