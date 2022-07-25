<?php

namespace App\Models;

use App\Models\Products\BookProduct;
use App\Models\Products\DvdProduct;
use App\Models\Products\FurnitureProduct;

class Product
{
    private $product;

    public function __construct(string $type)
    {
        $class = 'App\Models\Products\\' . ucwords(strtolower($type)) . 'Product';
        $this->product = new $class();
    }

    public function save(array $item): bool
    {
        return $this->product->store($item);
    }

    public function delete(array $ids): bool
    {
        return $this->product->remove($ids);
    }

    public static function findAll(): array
    {
        return array_merge(BookProduct::all(), DvdProduct::all(), FurnitureProduct::all());
    }

    public function getErrors(): array
    {
        return [
            'product' => $this->product->getErrorMessages(),
        ];
    }
}
