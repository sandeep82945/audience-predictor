let processPostHandler = require('./process_post_handler')
let predictAgeHandler = require('./predict_age_handler')
let dataReaderHandlers = require('./data_reader_handlers')
let handlers = {
  click:[{
    selector:'#process_post_text',
    callback: processPostHandler
  },
  {
    selector:'#predict_age',
    callback: predictAgeHandler
  },
  {
  	selector:'#list_data_files',
  	callback: dataReaderHandlers.listFiles
  }]
}
module.exports = handlers