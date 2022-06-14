import config from '../config/config'

class ajax {
  private url:string


  constructor() {
    this.url = config.baseURL
  }

  async get(endpoint:string) :Promise<any>  {
    const resp = await fetch(this.url+endpoint)
    const data =  await resp.json()
    return data
  }
  async post(endpoint:string, options?: object, data?:any) :Promise<any> {

    if(options == null) {
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