let fs = global.require('fs');
let XMLParser = global.require('xml2json');


class FileDataReader{
  constructor(filename, folder_path){
    this._filename = filename
    this.text_data = []
    this.folder_path = folder_path
  }
  read(){
    this.parseFileName()
    this.readFile()
  }
  parseFileName(){
    let tokens = this._filename.split('.')
    this.gender = tokens[1]
    this.age = parseInt(tokens[2])
  }
  readFile(callback){
    this.callback = callback
    let file_path = this.folder_path + this._filename 
    fs.readFile(file_path, (err, data) =>{
      let jsonData = XMLParser.toJson(data);
      let file_data = JSON.parse(jsonData)
      this.posts = file_data.Blog.post
      this.callback(this)
    });
  }
}

module.exports = FileDataReader