<?php

namespace Core;

use Core\FH;

class Request
{
    /**
     * get the pattern the the client request was made on
     *
     * @return void
     */
    public function getPath(): string
    {
        $path =  $this->trimPath($_SERVER['REQUEST_URI']) ??  '/';
        $pos =  strpos(($path), '?');
        if ($pos === false) {
            return $path;
        }
        return substr($path, 0, $pos);
    }

    /**
     * Get the method used to request the server
     *
     * @return string
     */
    public function getMethod(): string
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    /**
     * get submitted data
     *
     * @param string $input
     * @return string|array
     */
    public function get(string $input = null)
    {
        if (!$input) {
            $data = [];
            foreach ($_REQUEST as $field => $value) {
                $data[$field] = $value;
            }
            return $data;
        }
        return $this->sanitize($_REQUEST[$input]);
    }

    /**
     * sanitize input data
     *
     * @param [type] $dirty
     * @return void
     */
    public function sanitize($dirty)
    {
        return htmlentities($dirty, ENT_QUOTES, 'UTF-8');
    }

    private function trimPath($path): string
    {
        return str_replace('/'.basename(ROOT), '', $path);
    }
    public function csrfCheck()
    {
        if (!FH::checkToken($this->get('csrf_token'))) {
            Application::$app->router->redirect('restricted/badToken');
        }
        return true;
    }
}
