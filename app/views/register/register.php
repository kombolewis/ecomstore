<?php $this->start('head'); ?>
<?php $this->end(); ?>

<?php $this->start('body'); ?>
<div class="col-md-6 offset-md-3" >
  <div class="card" >
    <div class="card-body">
      <form action="" class="form" method="post">
        <div class="bg-danger"><?=$this->displayErrors ?></div>
        <h3 class="text-center">Register</h3>
        <div class="form-group">
          <label for="fname">First Name</label>      
          <input type="text" name="fname" id="fname" value="<?=$this->post['fname'] ?>" class="form-control" >
        </div>
        <div class="form-group">
          <label for="lname">Last Name</label>      
          <input type="text" name="lname" id="lname" value="<?=$this->post['lname'] ?>" class="form-control" >
        </div>
        <div class="form-group">
          <label for="email">Email</label>      
          <input type="email" name="email" id="email" value="<?=$this->post['email'] ?>" class="form-control" >
        </div>
        <div class="form-group">
          <label for="username">Choose a Username</label>      
          <input type="text" name="username" id="username" value="<?=$this->post['username'] ?>" class="form-control" >
        </div>
        <div class="form-group">
          <label for="password">Password</label>      
          <input type="password" name="password" id="password" value="<?=$this->post['password'] ?>" class="form-control" >
        </div>
        <div class="form-group">
          <label for="password">Confirm Password</label>      
          <input type="password" name="confirm" id="confirm" value="<?=$this->post['confirm'] ?>" class="form-control" >
        </div>
        <div class="d-flex justify-content-end">
          <input type="submit" class="btn btn-primary btn-large" value="Login">
        </div>
      </form>
    </div>
  </div>
</div>
<?php $this->end(); ?>