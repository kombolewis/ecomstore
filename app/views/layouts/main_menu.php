<?php  

?>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="<?=PROOT?>"><?=MENU_BRAND ?></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="main_menu">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>     
        <li class="nav-item">
          <a class="nav-link" href="/add-product">Product</a>
        </li>  
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="text-primary">Hello User</li>
    </ul>
  </div>
</nav>