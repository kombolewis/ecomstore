import Events from "./events";
import listeners from "../listeners";
import Globals from "./globals";

export default class Listener {

  
  private events: Events
  private globals:Globals;

  constructor(globals: Globals,events: Events) {
    this.events = events
    this.globals = globals
  }
  
  register() :void{
    Object.keys(listeners).forEach(l => {
      const objListner = new listeners[l](this.globals);
      this.events.getEvents().forEach( obj => {
        const {domEvent, callback, element} = obj
        if(typeof objListner[callback] == 'function') {
          element.addEventListener(domEvent, (e: Event) => objListner[callback](element, e))
        }
      }) 

    })
  }


}