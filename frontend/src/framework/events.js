import globals from "framework/globals"

export default class Events {

    getEvents() {
        const container = []
        const events = this.registeredDomEvents()
        events.forEach(event => {
            const {customEvent, domMapping} = event
            const elements = globals.document.querySelectorAll(`[${customEvent}]`)
            for (let element of elements) {
                let listener = element.getAttribute(customEvent)
                if (listener) {
                    container.push({domEvent:domMapping,callback:listener, element})
                }
            }
        })
        return container
    }


    registeredDomEvents() {
        return [
            {customEvent:'change', domMapping:'change'},
            {customEvent:'input', domMapping:'input'},
            {customEvent: 'submit', domMapping: 'submit'},
            {customEvent: 'click', domMapping: 'click'}
        ]
    }

}