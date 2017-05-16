let processPostHandler = require('./process_post_handler')
//let predictAgeHandler = require('./predict_age_handler')
let dataReaderHandlers = require('./data_reader_handlers')
let processTextHandler = require('./text_preprocess_handler')
let predictAudienceHandler = require('./predict_audience_handler')
let facebookLoginHandler = require('./facebook_login_handler')
let getAudienceHandler = require('./get_audience_handler')



let handlers = {
  click:[{
    selector:'#process_post_text',
    callback: processPostHandler
  },
  {
    selector:'#predict_audeience',
    callback: predictAudienceHandler
  },
  {
  	selector:'#list_data_files',
  	callback: dataReaderHandlers.listFiles
  },
  {
  	selector:'#read_file_data',
  	callback: dataReaderHandlers.readFiles
  },
  {
  	selector:'#demo_show_first_sentence',
  	callback: processTextHandler.showFirstSentence
  },
  {
  	selector:'#demo_show_tokens',
  	callback: processTextHandler.tokenize
  },
  {
  	selector:'#demo_remove_stop',
  	callback: processTextHandler.stopWords
  },
  {
  	selector:'#demo_lemmatize',
  	callback: processTextHandler.lemmatize
  },
  {
    selector:'#fb_login',
    callback: facebookLoginHandler
  },
  {
    selector:'#fb_audiences',
    callback: getAudienceHandler
  }
  
  ]
}
module.exports = handlers