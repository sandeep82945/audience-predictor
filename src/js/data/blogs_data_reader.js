
const blogs_path = './data/blogs/'
const fs = global.require('fs');
const path = global.require('path')
const consts = require('../consts')
const ageGroups = consts.age_groups


let FileDataReader = require('./file_data_reader')
let $ = global.$


class BlogsDataReader{
  constructor(){
    this.folder_path = blogs_path
  }
  read(){
    this.readfileNames()
    this.readFiles()
  }
  readfileNames(){
    fs.readdir(this.folder_path, (err, files) => {
      this._files = files
    });
  }

  readFiles(){
    $.each(this._files, (index, file) =>{
      this.readFileData(file)
    })
  }
  readFileData(filename){
    if(path.extname(filename) === '.xml'){
      let reader = new FileDataReader(filename, this.folder_path)
      reader.read(this.onFileRead.bind(this))
    }
  }
  findAgeGroup(age){
    let ageGroup = null;
    $.each(ageGroups, (index, group) =>{
      if (age >=group.minvalue && age < group.maxValue){
        ageGroup = group
      }
    }); 
    return ageGroup
  }
  onFileRead(reader){
    let ageGroup = this.findAgeGroup(reader.blogs_data.age)
    console.log(ageGroup)
  }

}
module.exports = BlogsDataReader