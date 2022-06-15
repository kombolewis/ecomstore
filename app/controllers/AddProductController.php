<?php

namespace App\Controllers;

use Core\DB;
use Core\Controller;
use App\Models\Product;
use App\Models\ProductDescription;

class AddProductController extends Controller {
  public function __construct($controller, $action) {
    parent::__construct($controller, $action);
    // $this->load_model('Users');
    $this->view->setLayout('default');

  } 
  public function create() {
    $this->render('add-product/create');
  }

  public function store() {
    $product = new Product;
    $this->csrfCheck();
    $product->assign($this->get());
    if($product->save() && [$status, $descriptionErrors] = $this->saveDescription()){
      if($status) return $this->jsonResp([
        'status' => 'success',
        'errors' => [
          'product' => $product->getErrorMessages(),
          'productDescription' => $descriptionErrors
        ]
      ]);
      return $this->jsonResp(['status' => 'fail', 'errors' => [
        'product' => $product->getErrorMessages(),
        'productDescription' => $descriptionErrors
      ]]);
    }
    return $this->jsonResp(['status' => 'fail', 'errors' => [
      'product' => $product->getErrorMessages(),
      'productDescription' => []
    ]]);

  }

  private function saveDescription() {
    $records = $this->findFieldsAndData();
    foreach($records as $record) {  
      $productDescription = new ProductDescription;
      $productDescription->assign($record);
      $save = $productDescription->save();
      if(!$save) break;
    }

    return [$save, $productDescription->getErrorMessages()];
  }

  private function findFieldsAndData() :array {
    $data = $this->get();
    $product_id = DB::getInstance()->lastID();
    $attributes = ['size', 'weight','height','length','width'];
    $sorted = [];

    foreach ($data as $name => $value) {
      if(in_array($name,$attributes)) {
        $items = [];
        $items['attribute'] = $name;
        $items['value'] = $value;
        $items['product_id'] = $product_id;
        $sorted[] = $items;
      }
    }
    return $sorted;
  }
}