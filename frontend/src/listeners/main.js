import ajax from "framework/ajax";
import Validator from "framework/validator";
import rules from 'listeners/rules/rule-control'
import { formData, findFormData  } from "listeners/helpers/helpers";
import globals from "framework/globals";

export default class Main {

    constructor() {
        this.validator = new Validator();
    }

    handleEvent(element, e) {
        const attributeName = element.getAttribute('name').toLowerCase()
        this.validator.validate(findFormData(attributeName), rules.findAll(attributeName), element)
    }

    handleCancel(element, e)  {
        globals.location = '/'
    }

    handleSubmit(element, e)  {
        let data = findFormData()

        this.validator.validate(data.map(arr => Object.fromEntries([arr])), rules.findAll())
        .then((obj) => {
            if (obj.validationPassed()) {
                const options = { method: 'post', body: formData(data) }
                return ajax.post('/add-product', options)
            }
            throw new Error('validation failed')
        })        
        .then(response => {
            if (response.status == 'success') {
                globals.location = '/'
            } else {
                throw new Error('could not create record')
            }
        })
        .catch(error => {
            console.log("failed \n", error)
        })
    }
}