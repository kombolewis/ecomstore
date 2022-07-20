<?php

namespace Seed;

use App\Models\Product;
use Seed\Traits\SeederTrait;

class ProductTableSeeder extends Product 
{
   use SeederTrait;

    public function seedColumns() :bool
    {
    
        $this->sku = $this->generateRandomSku();
        $this->name = $this->generateRandomName();
        $this->price = $this->generateRandomInt();
        $this->productType = $this->generateRandomProductType();
        return $this->save();
    }
    
    public function afterSave()
    {
        $error = $this->error();
        $ok = $error ? false : true;
        if ($ok) {
            $this->response($ok,"{$this->sku} saved successfully", true);
        } else {
            $this->response($ok,"{$this->sku} was not saved", true);
        }
    }
}