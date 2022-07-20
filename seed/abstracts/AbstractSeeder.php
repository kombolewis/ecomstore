<?php

namespace Seed\Abstracts;

use App\Models\Product;
use App\Models\ProductDescription;

abstract class AbstractSeeder
{

 
    protected function truncateTables() {
         if($this->descriptionTruncate()) {
             return $this->productTruncate();
         }
         return false;
     }
     private function productTruncate () {
         $p = new Product;
         $productTable = Product::table;
        $productTruncationError = $p->query("DELETE FROM {$productTable}")->error();
        if($productTruncationError)  return false;
        return true;
     }
 
     private function descriptionTruncate() {
         $d = new ProductDescription;  
         $descriptionTable = ProductDescription::table;
         $error = $d->query("DELETE FROM {$descriptionTable}")->error();
         if($error) return false;
         return true;
 
     }

}