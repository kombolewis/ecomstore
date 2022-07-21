import ajax from "framework/ajax"
import globals from "framework/globals"

export default class Validator {
  
    constructor() {
        this.passed = false
        this.document = globals.document
    }

    async check(data, items) {
        this.errors = []

        for (const {field, display, rules} of items) {
            for (const {rule, rule_value} of rules) {
                const inputValueObj = data.find(obj => Object.keys(obj).toString() == field)
                const value = inputValueObj[field]

                if (rule == 'required' && !value) {
                    this.addError({field, message:`Please, submit required data`})
                } else if(value) {
                    switch (rule) {
                        case 'min':
                            if (value.length < rule_value) {
                                this.addError({field, message:`${display} must be a minimum of ${rule_value} characters`})
                            }
                            break
                        case 'max':
                            if (value.length > rule_value) {
                                this.addError({field, message:`${display} must be a maximum of ${rule_value} characters`})
                            }
                            break
                        case 'unique':

                            const query = {sql:`SELECT ${field} FROM ${rule_value} WHERE ${field} = ?`,bind:[value]}
                            const formData = new FormData();
                            for (const key in query) {
                                formData.append(key,query[key]);
                            }
                            const options = { method: 'POST', body: formData }
                            const data = await ajax.post('/validate-unique', options)
                            if (data.count > 0) {
                                this.addError({field, message:`${display} already exists. Please choose  another ${display}`})
                            }

                            break 
                        case 'numeric':
                            if (isNaN(value)) {
                                this.addError({field, message:`Please, provide the data of indicated type`})
                            }
                            break
                    }
                }
            }
        }
    }

    async validate(data, items, element=null) {
        await this.validateHelper(data,items,element)
        this.checkpassed()
        return this
    }
    async validateHelper(data, items,element) {
        if (element) {
            await this.check(data, items)
            this.write(element)
        } else {
            for (const obj of data) {
                for (const item of items) {
                    if (Object.keys(obj).toString() == item.field) {
                        await this.check([obj], [item])
                        this.write(this.document.getElementById(item.field))
                    }
                }
            }
        }
    }

    addError(error) {
        this.errors.push(error)
        if (this.errors.length == 0) {
            this.passed = true
        } else {
            this.passed = false
        }
    }

    checkpassed() {
        if (this.errors.length == 0) {
            this.passed = true
        }
    }

    validationPassed() {
        return this.passed
    }

    write(element) {
        const errorElement = this.getErrorElement(element)

        const list = this.document.createElement('ul');
        errorElement.appendChild(list)

        for (const {message} of this.errors) {
            const li = this.document.createElement('li').appendChild(this.document.createTextNode(message))
            list.appendChild(li)
        }
        element.after(errorElement)
    }

    getErrorElement(element) {
        const elementid = element.getAttribute('id')
        const errorElementId = elementid + 'Errors'
        let errorElement = this.document.getElementById(errorElementId) 

        if (errorElement) {
            errorElement.innerHTML= ''
        } else {
            errorElement = this.document.createElement('div')
            errorElement.setAttribute('id', errorElementId)
            errorElement.classList.add("text-danger")
        }
        return errorElement
    }


}