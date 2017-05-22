
let data_file = './fb_audiences.json'
let fs = global.require('fs')
let $ = global.$
let ui_utils = require('./utils')

let showAudiences = (audiences) =>{
  //let html = `<code>  ${JSON.stringify(audiences)}</code>`
  //$().html(html)
  ui_utils.displayAudiences('#demo_audiences', audiences)
}

let read = (data) =>{
  global.fb_audiences = []
  let audiences = JSON.parse(data)
  $.each(audiences, (index, audience) =>{
    global.fb_audiences.push(audience)
  })
  showAudiences(global.fb_audiences)
}

let readFromFile = () =>{
  fs.readFile(data_file,  function(error,data) {
    if(error) {
      console.error(error);
      return
    }
    read(data.toString())
  })
}


module.exports = () =>{
  global.fb_audiences = []
  readFromFile()
}

