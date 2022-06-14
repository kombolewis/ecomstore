<?php 

use Core\FH;


?>
<?php $this->start('head'); ?>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<?php $this->end(); ?>

<?php $this->start('body'); ?>
<div class="col-md-12 mt-3">
      <div class="d-flex justify-content-between">
        <h3>Product Add</h3>
        <div>
          <button  class="btn btn-success" click="handleSubmit">Save</button>
          <button class="btn btn-danger" click="handleCancel">Cancel</button>
        </div>
      </div>
</div>
<hr>
<div class="col-md-6 offset-md-3 mt-3" >
  <div class="card" >
    <div class="card-body" >

      <form class="form" id="product_form" >
        <?php //FH::displayErrors($this->displayErrors)?>
        <?=FH::csrfInput() ?>
        <?=FH::inputBlock('text','SKU','sku','',['class' => 'form-control input-sm', 'change' => 'handleSku'],['class' => 'form-group']) ?>
        <?=FH::inputBlock('text','Name','name','',['class' => 'form-control input-sm',  'change' => 'handleName'],['class' => 'form-group']) ?>
        <?=FH::inputBlock('text','Price ($)','price','',['class' => 'form-control input-sm',  'input' => 'handlePrice'],['class' => 'form-group']) ?>

        <div x-data="{propertyType:''}" >
          <div class="form-group">
            <label for="productType">Type Switcher</label>
            <select class="form-control input-sm" id="productType" name="productType"  x-model="propertyType">
              <option></option>
              <option id="DVD" value="DVDs">DVD</option>
              <option id="Furniture" value="Furniture">Furniture</option>
              <option id="Book" value="Books">Book</option>
            </select>
          </div>
          <!-- <span x-if="propertyType == 'DVDs'"></span> -->
          <div x-show="propertyType == 'DVDs'">
            <div>
              <?=FH::inputBlock('text','Size (MB)','size','',['class' => 'form-control input-sm', 'input' => 'handleSize'],['class' => 'form-group']) ?>
              <span>Please, provide size</span>

            </div>
          </div>
          <div x-show="propertyType == 'Furniture'">
            <div>

              <?=FH::inputBlock('text','Height (CM)','height','',['class' => 'form-control input-sm', 'input' => 'handleFntHeight'],['class' => 'form-group']) ?>
              <?=FH::inputBlock('text','Width (CM)','width','',['class' => 'form-control input-sm','input' => 'handleFntWidth'],['class' => 'form-group']) ?>
              <?=FH::inputBlock('text','Length (CM)','length','',['class' => 'form-control input-sm', 'input' => 'handleFntLength'],['class' => 'form-group']) ?>
              <span>Please, provide dimensions</span>

            </div>

          </div>
          <div x-show="propertyType == 'Books'">
            <div>
              <?=FH::inputBlock('text','Weight (KG)','weight','',['class' => 'form-control input-sm','input' => 'handleWeight'],['class' => 'form-group']) ?>
              <span>Please, provide Weight</span>
            
            </div>

          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<?php $this->end(); ?>
