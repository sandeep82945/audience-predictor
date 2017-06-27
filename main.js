var electron = require('electron')
// Module to control application life.
var app = electron.app
// Module to create native browser window.
app.commandLine.appendSwitch(' --enable-file-cookies', true)

var BrowserWindow = electron.BrowserWindow
var FB = require('fb');

var path = require('path')
var url = require('url')
var ipc = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipc.on("facebook-button-clicked",function (event, arg) {
  console.log("called" + arg)
  var options = {
    client_id: '615566271976367',
    scopes: "public_profile&ads_read&ads_management&business_management&read_audience_network_insights&manage_pages",
    redirect_uri: "https://www.facebook.com/connect/login_success.html"
  };
  var authWindow = new BrowserWindow({ width: 450, height: 300, show: false, webPreferences:{ nodeIntegration: false }});
  var facebookAuthURL = "https://www.facebook.com/dialog/oauth?client_id=" + options.client_id + "&redirect_uri=" + options.redirect_uri + "&response_type=token,granted_scopes&scope=" + options.scopes + "&display=popup";

  //authWindow.webContents.executeJavaScript("window.require=null");
  authWindow.loadURL(facebookAuthURL);
  authWindow.show();
  //authWindow.webContents.executeJavaScript("$()window.close()");
  authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    var raw_code = /access_token=([^&]*)/.exec(newUrl) || null;
    access_token = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    error = /\?error=(.+)$/.exec(newUrl);
    if(access_token) {
      FB.setAccessToken(access_token);
      //console.log(access_token)
      //ipc.send('set-access-token', access_token)
      mainWindow.webContents.executeJavaScript("window.setAccessToken(\"" +  access_token+ "\");");
      //mainWindow.access_token = access_token
      FB.api('/me', { fields: ['id', 'name', 'picture.width(800).height(800)'] }, function (res) {
        //console.log(" Name: " + res.name )
        // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-name\").innerHTML = \" Name: " + res.name + "\"");
        // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-id\").innerHTML = \" ID: " + res.id + "\"");
        // mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-dp\").src = \"" + res.picture.data.url + "\"");
      });
      authWindow.close();
    }
  });
})

ipc.on("facebook-logout",function (event, arg) {

  var session = mainWindow.webContents.session
  session.clearStorageData(['cookies'], ()=>{
    console.log("done")
  })
  /*console.log("called" + arg)
  //const ses = session.defaultSession
  const ses = session.fromPartition('persist:name')
  ses.clearCache(()=>{
    console.log("done")
  })*/
  /*console.log(ses.clearStorageData(['cookies'], ()=>{
    ses.cookies= []
  }))*/
  ///const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
  //session.defaultSession.cookies.set(cookie, (error) => {
  //  if (error) console.error(error)
  //})
})

app.on('activate', function () {




  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
