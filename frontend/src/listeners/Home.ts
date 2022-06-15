import ajax from "../framework/ajax";
import Globals from "../framework/globals";
import Listener from "../framework/listener";
import Validator from "../framework/validator";

export default class Home {
  private globals;
  private validator: Validator;
  
  constructor(globals: Globals) {
    this.globals = globals
    this.validator = new Validator(globals.document);
  }

  handleSku(element: Element, e: Event) :void {
    const data = [{sku:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('sku'), element)
  }
  handleName(element: Element, e: Event) :void {
    const data = [{name:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('name'), element)
  }
  handlePrice(element: Element, e: Event) :void {
    const data = [{price:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('price'), element)
  }
  handleWeight(element: Element, e: Event) :void {
    const data = [{weight:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('weight'), element)
  }

  handleSize(element: Element, e: Event) :void {
    const data = [{size: (e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('size'), element)
  }
  handleFntHeight(element, e) :void {
    const data = [{height:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('height'), element)
  }
  handleFntWidth(element, e) :void {
    const data = [{width:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('width'), element)
  }
  handleFntLength(element, e) :void {
    const data = [{length:(e.target as HTMLInputElement).value}]
    this.validator.validate(data, this.rules('length'), element)
  }

  trimData(cdata) {

   const data = cdata[0]

    const cont = {
      DVDs:'size',
      Furniture:['height','length', 'width'],
      Books:'weight'
    }
    
    /**
     * remove the selected key from temp array
     */
    for (const key in data) {
      if(key == 'productType') {
        const value = data[key]
        delete cont[value]
      }
    }
    

    /**
     * remove all others from submitted data
     */
    for (const key in cont) {
      const value = cont[key]
      if(value.constructor === Array) {
        for(const dkey in data) {
          for (const item of value) {
            if(item == dkey) {
              delete data[dkey]
            } 
          }
        }
      }else {
        delete data[value]
      }
    }

    return [data]

  }
  handleCancel(element: Element, e: Event) :void {
    this.globals.redirect('/')
  }


  handleSubmit(element: Element, e: Event) :void {

    const target = this.globals.document.forms[0]
    const formData = new FormData(target);
    let data = [...formData.entries()].map(arr => {
     return Object.fromEntries([arr])
    })

    this.validator.validate(data, this.rules())
    .then((obj) => {
      if(obj.validationPassed()) {
        data = this.trimData(Array.of(Object.fromEntries(formData.entries())))  
        const newFormData = new FormData();
        for (const key in data[0]) {
          newFormData.append(key,data[0][key]);
        }
        const options = { method: 'post', body: newFormData }
        return ajax.post('/add-product', options)
      }
    })        
    .then(response => {
      if (response.status == 'success') {
        this.globals.redirect('/')
      }else {
        throw new Error('could not create record')
      }
    })
    .catch(error => {
      console.log(error)
    })


  }



  private rules(attribute?: string) {
    const data = [
      {
        field:'sku',
        display:'SKU',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'unique', rule_value:'product'},
        ]
      },
      {
        field:'name',
        display:'Name',
        rules: [
          {rule:'required', rule_value:true},
        ]
      },
      {
        field:'price',
        display:'Price',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},
        ]
      },
      {
        field:'weight',
        display:'Weight',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},

        ]
      },
      {
        field:'size',
        display:'Size',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},

        ]
      },
      {
        field:'height',
        display:'Height',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},

        ]
      },
      {
        field:'width',
        display:'Width',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},

        ]
      },
      {
        field:'length',
        display:'Length',
        rules: [
          {rule:'required', rule_value:true},
          {rule:'numeric', rule_value:true},

        ]
      },
      {
        field:'productType',
        display:'Type Switcher',
        rules: [
          {rule:'required', rule_value:true},
        ]
      },

      
    ]
    if(attribute)return data.filter(obj =>  obj.field == attribute)
    return data
    
  }


}