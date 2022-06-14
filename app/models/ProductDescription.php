<?php

namespace App\Models;

use Core\Model;


class ProductDescription extends Model {
  public $id, $attribute, $value, $product_id;

  function __construct() {
    parent::__construct('product_description');
  }



}