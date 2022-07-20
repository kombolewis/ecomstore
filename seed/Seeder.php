<?php

namespace Seed;

use Seed\Abstracts\AbstractSeeder;
use Seed\ProductTableSeeder;
use Seed\ProductDescriptionSeeder;

class Seeder extends AbstractSeeder
{

    public function truncate()
    {
        return $this->truncateTables();
    }
    public function seed()
    {
        $s = new ProductTableSeeder();
        $s->seedColumns();
        $d = new ProductDescriptionSeeder();
        $d->seedColumns();
    }

}