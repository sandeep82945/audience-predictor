
let data_file = './fb_audiences.json'
let fs = global.require('fs')
//let $ = global.$

module.exports = () =>{

  fs.writeFile(data_file, JSON.stringify(global.fb_audiences), function(err) {
    if(err) {
      console.error(err);
    }
    console.log("The file was saved!");
  });
}