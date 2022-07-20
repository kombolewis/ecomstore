<?php

namespace App\Models;

use App\Models\Abstracts\AbstractProductDescription;

class ProductDescription extends AbstractProductDescription 
{

    public const table = 'product_description';
    
    public function __construct() {
        parent::__construct(self::table);
    }

}