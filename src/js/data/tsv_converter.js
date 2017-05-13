let tsv = require('tsv')
let fs = global.require('fs')
let $ = global.$
const consts = require('../consts')
const ageGroups = consts.age_groups
//const TextProcessor = require('../preprocessor')

class CSVConverter
{
  constructor(){
  }

  convertTexts(group){
    let texts = this.data[group.id]
    $.each(texts, (index, text) => {
      text = this.preprocess(text)
      this.tsv_data.push({age_group: group.id, text: text})  
    });

  }
/*
  preprocess(text){
    let textProcessor = new TextProcessor(text)

  }
*/
  convertTsv(data, filename){
    this.tsv_data = []
    this.data = data
    $.each(ageGroups, (index, group) =>{
      this.convertTexts(group)
    }); 

    let text = tsv.stringify(this.tsv_data)
    fs.writeFile(filename, text, function(err) {
      if(err) {
        console.error(err);
      }
      console.log("The file was saved!");
    });
  }
}

module.exports = CSVConverter