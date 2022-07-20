import listeners from "listeners";

export default class Listener {

    constructor(events) {
        this.events = events
    }
    
    register() {
        Object.keys(listeners).forEach(l => {
            const objListner = new listeners[l]();
            this.events.getEvents().forEach( obj => {
                const {domEvent, callback, element} = obj
                if (typeof objListner[callback] == 'function') {
                    element.addEventListener(domEvent, (e) => objListner[callback](element, e))
                }
            }) 
        })
    }
}