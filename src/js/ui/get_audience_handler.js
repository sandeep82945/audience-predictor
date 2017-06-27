let FBApi = require('../facebook/fb_api')

let fs = global.require('fs')
let token_file = '../server/token.txt'
//let $ = global.$
let Audience = require('../audience/audience')
let ui_utils = require('./utils')


let showAudiences = (audiences) =>{
  //let html = `<code>  ${JSON.stringify(audiences)}</code>`
  //$().html(html)
  ui_utils.displayAudiences('#demo_audiences', audiences)
}

let createAudiences = (json_data) =>{
  global.fb_audiences.push(new Audience(json_data, json_data))
}

let callback = (res, audience_name) => {
  res.name = audience_name
  //global.audiences = res
  createAudiences(res)
  showAudiences(global.fb_audiences)
}

let read = (token) =>{
  let current_token = global.access_token || token
  let fbapi = new FBApi(current_token)
  fbapi.getFBAudiences(callback)
}

let getAccessToken = () =>{
  fs.readFile(token_file,  function(error,data) {
    if(error) {
      console.error(error);
      return
    }
    read(data.toString())
  })
}




module.exports = () =>{
  global.fb_audiences = []
  getAccessToken()
}
