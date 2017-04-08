let $ = global.$
let TextProcessor = require('../text_processor')
module.exports = () =>{
  let post_text = $('#post_text').val()
  let text_processor = new TextProcessor(post_text)
  text_processor.preprocess()
}