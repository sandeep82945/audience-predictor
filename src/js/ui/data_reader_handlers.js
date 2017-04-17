let $ = global.$
const ui_utils = require('./utils')
let DataReader = require('../data/blogs_data_reader')
let dataReader = new DataReader()
dataReader.readfileNames()
module.exports = {
  listFiles(){
    let html = ui_utils.repeat("<p>", dataReader._files, "</p>")
    $('#data_files_display').html(html)
  }
} 