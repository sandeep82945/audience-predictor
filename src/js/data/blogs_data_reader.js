
const blogs_path = './data/blogs/'
const fs = global.require('fs');
const path = global.require('path')
const consts = require('../consts')
const ageGroups = consts.age_groups


let FileDataReader = require('./file_data_reader')
let $ = global.$

class BlogsDataReader{
  constructor(path, callback){
    this.folder_path = path || blogs_path
    this.blogs_data = {}
    this.files_count = 0;
    this._callback = callback
  }
  read(){

    this.readfileNames()
    //this.readFiles()
  }
  readfileNames(){
    fs.readdir(this.folder_path, (err, files) => {
      this._files = files
      this.readFiles()
    });
  }

  readFiles(){
    this.files_count = 0;
    $.each(this._files, (index, file) =>{
      this.readFileData(file)
    })
  }
  readFileData(filename){
    if(path.extname(filename) === '.xml'){
      let reader = new FileDataReader(filename, this.folder_path)
      this.files_count++
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
  getBlogsData(oldData , posts){
    return (oldData)? oldData.concat(posts) : posts  
  }
  onFileRead(reader){
    this.files_count--
    if(reader && reader.age){
      let ageGroup = this.findAgeGroup(reader.age)
      if(reader.posts){
        let oldData = this.blogs_data[ageGroup.id]
        this.blogs_data[ageGroup.id] = this.getBlogsData(oldData, reader.posts)
      }
      //console.log(ageGroup)
    }
    if(this.files_count === 0){
      this.onComplete()
    }
  }
  onComplete(){
    console.log(this.blogs_data)
    if(this.callback)
      this.callback(this.blogs_data)
  }

}
module.exports = BlogsDataReader