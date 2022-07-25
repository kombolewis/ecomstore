<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Product;

class ProductListController extends Controller
{
    public function __construct($controller, $action)
    {
        parent::__construct($controller, $action);
        $this->view->setLayout('default');
    }

    public function index()
    {
        $this->render('product-list/index', [
            'products' => Product::findAll()
        ]);
    }

    public function delete()
    {
        $ids = $this->get();
        if (!empty($ids)) {
            $keys = array_keys($ids);
            foreach ($keys as $key) {
                $product = new Product($key);
                $product->delete($ids[$key]);
            }
        }
        $this->redirect('/');
    }
}
