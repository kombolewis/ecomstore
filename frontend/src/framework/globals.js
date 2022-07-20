class Globals {
    
    constructor() {
        if (Globals.instance instanceof Globals) {
            return Globals.instance
        }

        this.doc = window.document
        this.loc = window.location

        Globals.instance = this
    }

    
    get document() {
        return this.doc
    }

    set location(path) {
        this.loc.pathname = path
    }

}

export default (new Globals())