<?php

declare(strict_types =1);

namespace Core;


class Router {

  /**
   * @var array
   */
  protected array $routes = [];

  /**
   * @var Request
   */
  public  Request $request;

  /**
   * main class constructor
   *
   * @param Request $request
   * @return void
   */
  function __construct(Request $request) {
    $this->request = $request;
  }

  /**
   * get method for GET HTTP calls
   *
   * @param string $path
   * @param array $callback
   * @return void
   */
  public function get(string $path,  array $callback) :void {
    $this->routes['get'][$path] = $callback;
  }

  /**
   * post method for POST HTTP calls
   *
   * @param string $path
   * @param array $callback
   * @return void
   */
  public function post(string $path,  array $callback) :void {
    $this->routes['post'][$path] = $callback;
  }

  /**
   * resolve the different callbacks for different paths
   *
   * @return string
   */
  public function resolve() {
    $path = $this->request->getPath();
    $method = $this->request->getMethod();
    $callback = $this->routes[$method][$path] ?? false;
    if(!$callback)  return 'NOT FOUND';
    //controller
    $controller =  ucwords($callback[0]); 
    array_shift($callback);

    //action
    $action = $callback[0];

    if(method_exists($controller, $action)){
      return (new $controller($controller, $action))->$action();
    } else {
      die('That method '.$action.' does not exist in the controller \"' .$controller. '\"');
    }
    
 
  }


  public function redirect($path) {
    $callback = $this->routes['get'][$path] ?? false;
    if(!$callback)  return 'NOT FOUND';
    //controller
    $controller =  ucwords($callback[0]); 
    array_shift($callback);

    //action
    $action = $callback[0];

    if(method_exists($controller, $action)){
      return (new $controller($controller, $action))->$action();
    } else {
      die('That method '.$action.' does not exist in the controller \"' .$controller. '\"');
    }

  }

  public function url($location) {
    
    echo '<script type="text/javascript">';
    echo 'window.location.href = "'.$location.'";';
    echo '<script>';
    echo '<noscript>';
    echo '<meta http-equiv="refresh" content="0;url='.$location.'"/>';
    echo '</noscript>';exit;
  }

}