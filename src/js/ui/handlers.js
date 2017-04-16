let processPostHandler = require('./process_post_handler')
let predictAgeHandler = require('./predict_age_handler')

let handlers = {
  click:[{
    selector:'#process_post_text',
    callback: processPostHandler
  },
  {
    selector:'#predict_age',
    callback: predictAgeHandler
  }]
}
module.exports = handlers