let processPostHandler = require('./process_post_handler')

let handlers = {
  click:[{
    selector:'#process_post_text',
    callback: processPostHandler
  }]
}
module.exports = handlers