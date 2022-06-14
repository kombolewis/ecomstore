import Globals from "./globals";
import {Icontainer, IdomEvents} from "./types";

export default class Events {

  
  private document: Document;

  constructor(globals: Globals) {
    this.document = globals.document
  }

  getEvents() :Array<Icontainer>{
    const container = []
    const events = this.registeredDomEvents()
    events.forEach(event => {
      const {customEvent, domMapping} = event
      const elements = this.document.querySelectorAll(`[${customEvent}]`)
      for (let element of elements) {
        let listener = element.getAttribute(customEvent)
        if(listener) {
          container.push({domEvent:domMapping,callback:listener, element})
        }
      }
    })
    return container
  }


  private registeredDomEvents() :Array<IdomEvents>{
    return [
      {customEvent:'change', domMapping:'change'},
      {customEvent:'input', domMapping:'input'},
      {customEvent: 'submit', domMapping: 'submit'},
      {customEvent: 'click', domMapping: 'click'}
    ]
  }

}