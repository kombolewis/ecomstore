<?php

namespace App\Models;

use App\Models\Abstracts\AbstractProduct;

class Product extends AbstractProduct
{

    public const table = 'product';


    public function __construct() 
    {
        parent::__construct(self::table);
    }

    public function store(array $item)
    {
        return $this->saveProduct($item);
    }

    public function removeProducts(array $ids)
    {
        return $this->remove($ids);
    }

}