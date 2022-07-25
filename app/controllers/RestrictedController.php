<?php

namespace App\Controllers;

use Core\Controller;

class RestrictedController extends Controller
{
    public function __construct($controller, $action)
    {
        parent::__construct($controller, $action);
    }

    public function index()
    {
        $this->render('restricted/index');
    }

    public function badToken()
    {
        $this->render('restricted/badToken');
    }
}
