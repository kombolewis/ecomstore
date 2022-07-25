<?php

namespace Core;

class View
{
    protected $_head;
    protected $_body;
    protected $_siteTitle=SITE_TITLE;
    protected $outputBuffer;
    protected $_layout = DEFAULT_LAYOUT;

    public function render($viewName, $params)
    {
        $this->renderHelper($viewName, $params);
    }

    public function content($type)
    {
        if ($type == 'head') {
            return $this->_head;
        } elseif ($type == 'body') {
            return $this->_body;
        }
        return false;
    }

    public function start($type)
    {
        $this->_outputBuffer = $type;
        ob_start();
    }

    public function end()
    {
        if ($this->_outputBuffer == 'head') {
            $this->_head = ob_get_clean();
        } elseif ($this->_outputBuffer == 'body') {
            $this->_body = ob_get_clean();
        } else {
            die('You must first run start method');
        }
    }

    public function siteTitle()
    {
        return $this->_siteTitle;
    }

    public function setSiteTitle($title)
    {
        $this->_siteTitle = $title;
    }

    public function setLayout($path)
    {
        $this->_layout = $path;
    }

    public function renderPartial($viewName, $params = [])
    {
        $this->renderHelper($viewName, $params, true);
    }

    public function renderHelper($viewName, $params, $partial=false)
    {
        if ($params) {
            foreach ($params as $key => $value) {
                $$key = $value;
            }
        }
        $viewAry = explode('/', $viewName);
        $viewString = implode(DS, $viewAry);
        if (file_exists(ROOT . DS . 'app' . DS . 'views' . DS . $viewString . '.php')) {
            include(ROOT . DS . 'app' . DS . 'views' . DS . $viewString . '.php');
            if (!$partial) {
                include(ROOT . DS . 'app' . DS . 'views' . DS . 'layouts' . DS . $this->_layout . '.php');
            }
        } else {
            die('The view \"' .$viewName. '\" does not exist');
        }
    }
}
