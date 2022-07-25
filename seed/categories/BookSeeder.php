<?php

namespace Seed\Categories;

use App\Models\Products\BookProduct;
use Seed\Traits\SeederTrait;

class BookSeeder extends BookProduct
{
    use SeederTrait;

    private string $type;

    public function __construct(string $type)
    {
        parent::__construct();
        $this->type = $type;
    }

    public function afterSave()
    {
        $error = $this->error();
        $ok = $error ? false : true;
        if ($ok) {
            $this->response($ok, "{$this->name} saved successfully", true);
        } else {
            $this->response($ok, "{$this->name} was not saved", true);
        }
    }

    public function seed()
    {
        $this->store($this->generateColumnsData());
    }

    private function generateColumnsData(): array
    {
        return [
            'sku' => $this->generateRandomSku(),
            'name' => $this->generateRandomName(),
            'price' => $this->generateRandomInt(),
            'productType' => $this->type,
            'weight' => $this->generateRandomInt()
        ];
    }
}
