let consts = require('../consts')
 
let getloginurl = () =>{
  return `https://graph.facebook.com/v2.9/oauth/access_token?grant_type=client_credentials&app_id=${consts.facebook.application_id}&client_id=${consts.facebook.application_id}&redirect_uri=${consts.facebook.redirect_url}&client_secret=${consts.facebook.client_secret}&code=code&scope=ads_management`
}


module.exports = () =>{
  let url = getloginurl()
  window.open(url)
}