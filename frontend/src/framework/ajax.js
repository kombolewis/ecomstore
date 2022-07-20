import {BASE_URL} from 'config/config'

class ajax {

    constructor() {
        this.url = BASE_URL
    }

    async get(endpoint)  {
        const resp = await fetch(this.url+endpoint)
        const data =  await resp.json()
        return data
    }

    async post(endpoint, options = {}, data = {}) {

        if (options == null) {
            options ={
                method:'post',
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        const resp = await fetch(this.url+endpoint,options)
        const dataJson =  await resp.json()
        return dataJson
    }
}


export default (new ajax())