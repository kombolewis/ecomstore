<?php

namespace App\Models;

use Core\H;
use Core\Model;


class Product extends Model {
  public $id, $sku, $name, $price, $productType;

  function __construct() {
    parent::__construct('product');
  }

  public function findWithDescription() {
    $productDescription = new ProductDescription;
    $products = $this->find();
    $descriptions = [];

    foreach($products as $rec) {
      $items = $productDescription->find([
        'conditions' => 'product_id = ?', 
        'bind' => [$rec->id]
      ]);
      $descriptions[$rec->id] = $items;
    }

    return [$products, $descriptions];
  }


}