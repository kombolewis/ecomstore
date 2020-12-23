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

  public function logoutAction() {
    if(currentUser())
      currentUser()->logout();
    Router::redirect('register/login');
  }


  public function registerAction() {

    $validation = new Validate();
    $poste_values = [
      'fname' => '',
      'lname' => '',
      'username' => '',
      'email' => '',
      'password' => '',
      'confirm' => '',
      
    ];
    if($_POST) {
      $poste_values = posted_values($_POST);
      $validation->check($_POST, [
        'fname' => [
          'display' => 'First Name',
          'required' => true
        ],
        'lname' => [
          'display' => 'Last Name',
          'required' => true
        ],
        'username' => [
          'display' => 'Username',
          'required' => true,
          'unique' => 'users',
          'min' => 6,
          'max' => 150,
        ],
        'email' => [
          'display' => 'Email',
          'required' => true,
          'unique' => 'users',
          'max' => 150,
          'valid_email' => true
        ],
        'password' => [
          'display' => 'Password',
          'required' => true,
          'min' => 6
        ],
        'confirm' => [
          'display' => 'Confirm Password',
          'required' => true,
          'matches' => 'password'
        ],
      ]);


      if($validation->passed()){
        $newUser = new Users();
        $newUser->registerNewUser($_POST);
        $newUser->login();
        Router::redirect('');
      }
    }

    $this->view->post = $poste_values;
    $this->view->displayErrors = $validation->displayErrors();
    $this->view->render('register/register');
  }


}