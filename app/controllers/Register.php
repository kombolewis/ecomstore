<?php 

class Register extends Controller {

  public function __construct($controller, $action) {
    parent::__construct($controller, $action);
    $this->load_model('Users');
    $this->view->setLayout('default');

  }

  public function loginAction() {
    $validation = new Validate();

    if($_POST) {
      $validation->check($_POST, [
        'username' => [
          'display' => 'Username',
          'required' => true
        ],
        'password' => [
          'display' => 'Password',
          'required' => true,
          'min' => 6
        ]
      ]);
      if($validation->passed()) {
        $user =  $this->UsersModel->findByUsername(Input::get('username'));
        if($user && password_verify(Input::get('password'), $user->password)) {
          $remember = (!is_null(Input::get('remember_me')));
          $user->login($remember);
          Router::redirect('');

        } else {
          $validation->addError('There was an error with your username or password');
        }
      } 
    }
    $this->view->displayErrors = $validation->displayErrors();
    return $this->view->render('register/login');
    
  }


}