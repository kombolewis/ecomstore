import Events from "./events";
import Listener from "./listener";
import Globals from "./globals";

export default class Framework {

  public listener: Listener;
  public events: Events;
  public globals: Globals;

  constructor() {
    this.globals = Globals.instantiate()
    this.events = new Events(this.globals)
    this.listener = new Listener(this.globals,this.events)
  }

  start() :void{
    this.listen()
  }


  private listen() :void {
    this.listener.register()
  }
  

}