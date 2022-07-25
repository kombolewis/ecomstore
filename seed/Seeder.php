<?php

namespace Seed;

use Seed\Abstracts\AbstractSeeder;
use Seed\Traits\SeederTrait;

class Seeder
{
    use SeederTrait;

    public function seed()
    {
        $type = $this->generateRandomProductType();
        $seeder = 'Seed\Categories\\' . ucwords(strtolower($type)) . 'Seeder';
        $s = new $seeder($type);
        $s->seed();
    }
}
