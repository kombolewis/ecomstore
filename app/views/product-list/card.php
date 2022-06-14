<?php

use Core\{FH};
// $dimensions = $this->view->dimensions;

?>
<div class="card" style="height:13rem">
  <div class="card-body">
    <?=FH::inputBlock('checkbox','',$product->sku,$product->id,['class' => 'delete-checkbox form-check-input'],['class' => 'form-check']) ?>
    <div class="row mt-3">
      <div class="col-md-12 text-center">
        <div class="text"><?=$product->sku?></div>
        <div class="text"><?=$product->name?></div>
        <div class="text"><?=$product->price?>$</div>

          <?php if($product->productType == 'Furniture'): ?>
            <div>Dimension:
              <span><?=$closure($description)?></span>
            </div>
          <?php else: ?>
            <?php foreach($description as $desc): ?>
              <div>
                <?=$desc->attribute?>:
                <span><?=$desc->value?></span>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>

      </div>
    </div>
  </div>
</div>

