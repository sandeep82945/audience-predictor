//let consts = require('../consts')
// var oauth = global.require('oauth-electron-facebook').oauth;
// var facebook = global.require('oauth-electron-facebook').facebook;
let ipc = global.require('electron').ipcRenderer
// let getloginurl = () =>{
//   return `https://graph.facebook.com/v2.9/oauth/access_token?grant_type=client_credentials&app_id=${consts.facebook.application_id}&client_id=${consts.facebook.application_id}&redirect_uri=${consts.facebook.redirect_url}`
// }
let $ = global.$
module.exports = () =>{
  ipc.send("facebook-logout", "yes");
  $('#fb-user-name').text('')
  $('#fb-user-image').attr('src',  '')
  $('#fb-user-image').hide()
  $('#fb_login').show()
  $('#fb_logout').hide()

  //let url = getloginurl()

  // var info = new facebook("615566271976367","508f0e61a63298135974ea17d3aa71e4", "public_profile", {redirect_url: 'https://www.facebook.com/connect/login_success.html'});
  // var auth = new oauth();
  // var promise = auth.login(info, window);
  // promise.then(console.log, console.error)
}
