<?php

namespace App\Controllers;

use Core\DB;
use Core\Controller;

class AjaxController extends Controller
{
    public function __construct($controller, $action)
    {
        parent::__construct($controller, $action);
    }


    public function index()
    {
        $postData = (object) $this->get();
        $sql = $postData->sql;
        $count = DB::getInstance()->query($sql, [$postData->bind])->count();
        $this->jsonResp(['count' => $count]);
    }
}
