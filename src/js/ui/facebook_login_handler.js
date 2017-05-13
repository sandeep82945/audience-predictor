let FBApi = require('../facebook/fb_api') 

let callback = (res) => {
  console.log(res)
}
 

module.exports = () =>{
  let fbapi = new FBApi()
  fbapi.getFBAudiences(callback)
}