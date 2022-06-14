<?php

namespace App\Controllers;

use Core\H;
use Closure;
use Core\Controller;
use App\Models\Product;
use App\Models\ProductDescription;

class ProductListController extends Controller {
  public function __construct($controller, $action) {
    parent::__construct($controller, $action);
    // $this->load_model('Users');
    $this->view->setLayout('default');

  } 

  public function index() {
    $records = (new Product)->findWithDescription();
    $this->render('product-list/index',[
      'records' => $records,
      'closure' => Closure::fromCallable([$this, 'dimensions'])
    ]);
  }

  public function delete() {

    $productIds = $this->get();
    foreach($productIds as $sku => $id) {
      $product = (new Product)->findById($id);
      if($this->removeChildren($id)) {
        $product->delete();
      }
    }
    $this->redirect('/');

  }

  private function removeChildren($id) {

    $productDescription = new ProductDescription;
    $children = $productDescription->find([
      'conditions' => 'product_id = ?',
      'bind' => [$id]
    ]);

    foreach($children as $child) {
      $status = $child->delete();
      if(!$status) break;
    }
    return $status;
  }

  private function dimensions($description) :string{
    $str = [];
    foreach($description as $desc){
      if($desc->attribute == 'height'){
        $str[0] = $desc->value;
      }
      if($desc->attribute == 'width'){
        $str[1] = $desc->value;
      }
      if($desc->attribute == 'length'){
        $str[2] = $desc->value;
      }
    }
    return join('*',$str);
  }
}