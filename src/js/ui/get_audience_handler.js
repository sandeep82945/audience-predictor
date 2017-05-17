let FBApi = require('../facebook/fb_api') 
let fs = global.require('fs')
let token_file = '../server/token.txt'
let $ = global.$
let Audience = require('../audience/audience')

let showAudiences = (audiences) =>{
  let html = `<code>  ${JSON.stringify(audiences)}</code>`
  $('#demo_audiences').html(html)
}

let createAudiences = (json_data) =>{
  global.fb_audiences.push(new Audience(json_data, json_data))
}

let callback = (res) => {
  global.audiences = res
  createAudiences(res)
  showAudiences(res)
}

let read = (token) =>{
  let fbapi = new FBApi(token)
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