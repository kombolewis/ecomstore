<?php

namespace App\Controllers;

use Closure;
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
        $product = new Product();
        $this->render('product-list/index',[
            'products' => $product->findProducts(),
            'closure' => Closure::fromCallable([$this, 'dimensions'])
        ]);
    }

    public function delete()
    {
        $product = new Product();
        $product->removeProducts($this->get());
        $this->redirect('/');
    }


    private function dimensions($description) :string
    {
        $str = [];
        foreach ($description as $desc) {
            if ($desc->attribute == 'height') {
                $str[0] = $desc->value;
            }
            if ($desc->attribute == 'width') {
                $str[1] = $desc->value;
            }
            if ($desc->attribute == 'length') {
                $str[2] = $desc->value;
            }
        }
        return join('*',$str);
    }
}