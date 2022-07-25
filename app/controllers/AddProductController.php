<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Product;

class AddProductController extends Controller
{
    public function __construct($controller, $action)
    {
        parent::__construct($controller, $action);
        $this->view->setLayout('default');
    }
    public function create()
    {
        $this->render('add-product/create');
    }

    public function store()
    {
        $product = new Product($this->get('productType'));
        $this->csrfCheck();
        $status = $product->save($this->get());
        $message = ($status) ? 'success' : 'fail';
        return $this->jsonResp([
            'status' => $message,
            'errors' => $product->getErrors()
        ]);
    }
}
