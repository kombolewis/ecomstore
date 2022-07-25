<?php

namespace Core;

class Session
{
    public static function exists($name)
    {
        return (isset($_SESSION[$name])) ? true : false;
    }

    public static function get($name)
    {
        return $_SESSION[$name];
    }

    public static function set($name, $value)
    {
        return $_SESSION[$name] = $value;
    }

    public static function delete($name)
    {
        if (self::exists($name)) {
            unset($_SESSION[$name]);
        }
    }

    public static function uagent_no_version()
    {
        $uagent = $_SERVER['HTTP_USER_AGENT'];
        $regx = '/\/[a-zA-Z0-9.]+/';
        return preg_replace($regx, '', $uagent);
    }
    /**
     * Adds a Session alert message
     *
     * @param string $type can be info, success, warning, danger
     * @param string $msg message you want to display in the alert
     * @return void
     */
    public static function addMsg($type, $msg)
    {
        $sessionName = 'alert-' . $type;
        self::set($sessionName, $msg);
    }

    public static function displayMsg()
    {
        $alerts = ['alert-info','alert-success','alert-warning','alert-danger'];
        $html = '';
        foreach ($alerts as $alert) {
            if (self::exists($alert)) {
                $html .= '<div class="alert '.$alert.' alert-dismissible fade show">';
                $html .= self::get($alert);
                $html .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                $html .= '</div>';
                self::delete($alert);
            }
        }
        return $html;
    }
}
