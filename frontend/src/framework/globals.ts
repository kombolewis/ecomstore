class Globals {


  private loc: Location;
  private doc: Document;
  static instance;

  private constructor() {
    this.doc = window.document
    this.loc = window.location
  }

  static instantiate() {
    if(!Globals.instance){
      Globals.instance = new Globals(); // the instance is an object of the entire class
    }
    return Globals.instance
  }

  
  get document() :Document {
    return this.doc
  }

  get location() :Location {
    return this.loc
  }

  redirect(path: string) :void{
    const location = this.location
    location.pathname = path
  }


}

export default Globals