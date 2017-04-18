let $ = global.$
const ui_utils = require('./utils')
let DataReader = require('../data/blogs_data_reader')
let dataReader = new DataReader('./data/samples/')
dataReader.readfileNames()
global.sample_data_reader = dataReader

module.exports = {
  listFiles(){
    let html = ui_utils.repeat("<p>", dataReader._files, "</p>")
    $('#data_files_display').html(html)
  },
  readFiles(){
    let html = ""
    $.each(dataReader.blogs_data, (index, data) => {
      let preTDtext = '<tr><td>'+ index +'</td><td><div class="post_text">'
      let tdtext = ui_utils.repeat("<p>", data, "</p>")
      html +=  preTDtext + tdtext + '</div></td>'
    })
    html = '<table> <theader><tr><th>Age Group</th><th>Post Text</th></tr></tthead><tbody>' + html +'</tbody></table>'
    $('#read_files_data_display').html(html)
  }
} 