let FBApi = require('../facebook/fb_api') 
let fs = global.require('fs')
let token_file = '../server/token.txt'
let $ = global.$

let showAudiences = (audiences) =>{
  let html = `<code>  ${JSON.stringify(audiences)}</code>`
  $('#demo_audiences').html(html)
}

let callback = (res) => {
  global.audiences = res
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
  getAccessToken()
}