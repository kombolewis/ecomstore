<?php

class Home extends Controller {
  
  function __construct($constroller, $action) {
    parent::__construct($controller, $action);
  }

  public function indexAction() {
    $db = DB::getInstance();
    $cnq = $db->findFirst('contacts', [
      'conditions' => ["lname = ?", "fname = ?"],
      'bind' => ['lewis','kombo'],

    ]);
    dnd($cnq);

    $this->view->render('home/index');    
  }

}