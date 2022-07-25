<?php

use Core\FH;

?>
<div class="card" style="height:13rem">
    <div class="card-body">
        <?php $name=$product->productType . '[]' ?>
        <?=FH::inputBlock('checkbox', '', $name, $product->id, ['class' => 'delete-checkbox form-check-input'], ['class' => 'form-check']); ?>
            <div class="row mt-3">
                <div class="col-md-12 text-center">
                    <div class="text"><?=$product->sku?></div>
                    <div class="text"><?=$product->name?></div>
                    <div class="text"><?=$product->price?>$</div>

                    <?php if ($product->height || $product->width || $product->length): ?>
                        <div>Dimension:
                            <span><?= $product->height ?> * <?= $product->width ?> * <?=$product->length ?></span>
                        </div>
                    <?php elseif ($product->weight): ?>
                        <div>weight:
                            <span><?= $product->weight ?></span>
                        </div>
                    <?php elseif ($product->size):?>
                        <div>size:
                            <span><?= $product->size ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
    </div>
</div>

