import Events from "framework/events";
import Listener from "framework/listener";

export default class Framework {
  
    constructor() {
        this.events = new Events()
        this.listener = new Listener(this.events)
    }

    start() {
        this.listen()
    }

    listen() {
        this.listener.register()
    }
}