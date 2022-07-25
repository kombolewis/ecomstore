<?php

namespace Core;

class H
{
    public static function dnd($data)
    {
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
        die();
    }

    public static function getObjectProperties($obj)
    {
        return get_object_vars($obj);
    }
}
