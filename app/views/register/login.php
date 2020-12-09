<?php $this->start('head'); ?>
<?php $this->end(); ?>

<?php $this->start('body'); ?>

<div class="col-md-6 offset-md-3" >
  <div class="card" >
    <div class="card-body">
      <form action="" class="form" method="post">
        <div class="bg-danger"><?=$this->displayErrors ?></div>
        <h3 class="text-center">Login</h3>
        <div class="form-group">
          <label for="username">Username</label>      
          <input type="text" name="username" id="username" class="form-control" >
        </div>
        <div class="form-group">
          <label for="password">Password</label>      
          <input type="password" name="password" id="password" class="form-control" >
        </div>
        <div class="form-group">
          <label for="remember_me">Remember Me <input type="checkbox" name="remember_me" id="remember_me" value="on"></label>
        </div>
        <div class="form-group">
          <input type="submit" value="Login" class="btn btn-primary">
        </div>
        <div class="d-flex justify-content-end">
          <a href="<?=PROOT?>register/register">Register</a>
        </div>
      </form>
    </div>
  </div>
</div>
<?php $this->end(); ?>