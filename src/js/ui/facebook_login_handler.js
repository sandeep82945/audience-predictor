//let consts = require('../consts')
// var oauth = global.require('oauth-electron-facebook').oauth;
// var facebook = global.require('oauth-electron-facebook').facebook;
let FBApi = require('../facebook/fb_api')
//var FB = require('fb');

let ipc = global.require('electron').ipcRenderer
// let getloginurl = () =>{
//   return `https://graph.facebook.com/v2.9/oauth/access_token?grant_type=client_credentials&app_id=${consts.facebook.application_id}&client_id=${consts.facebook.application_id}&redirect_uri=${consts.facebook.redirect_url}`
// }
let $ = global.$
let setProfileInfo = (info) =>{
  $('#fb-user-name').text(info.name)
  $('#fb-user-image').attr('src',  info.picture.data.url)
  $('#fb-user-image').show()
}
global.setAccessToken = (token) =>{
  global.access_token = token
  let fbapi = new FBApi(token)

  fbapi.getprofile(setProfileInfo)
  // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-name\").innerHTML = \" Name: " + res.name + "\"");
  // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-id\").innerHTML = \" ID: " + res.id + "\"");
  // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-dp\").src = \"" + res.picture.data.url + "\"");
  //});
}

module.exports = () =>{
  ipc.send("facebook-button-clicked", "yes");
  //let url = getloginurl()

  // var info = new facebook("615566271976367","508f0e61a63298135974ea17d3aa71e4", "public_profile", {redirect_url: 'https://www.facebook.com/connect/login_success.html'});
  // var auth = new oauth();
  // var promise = auth.login(info, window);
  // promise.then(console.log, console.error)
}
