
<?php $this->start('body'); ?>
    <div>
        <form action="/delete-items" method="post">
            <div class="row mt-3">
                <div class="col-md-12 ">
                    <div class="d-flex justify-content-between">
                        <h3>Product List</h3>
                    <div>
                        <a  class="btn btn-primary" href="/add-product">ADD</a>
                        <button class="btn btn-danger " id="delete-product-btn">MASS DELETE</button>
                    </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row mt-3">
                <?php foreach ($products as $product): ?>
                    <div class="col-md-3 mt-2 mb-2">
                        <?php $this->renderPartial('product-list/card',[
                            'product' => $product, 
                            'closure' => $closure
                            ]); 
                        ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </form>
    </div>
<?php $this->end(); ?>
