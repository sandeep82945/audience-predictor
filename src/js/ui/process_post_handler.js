let $ = global.$
let PreProcessor = require('../preprocessor')

/*let TextProcessor = require('../text_processor')

module.exports = () =>{
  let post_text = $('#post_text').val()
  let text_processor = new TextProcessor(post_text)
  text_processor.preprocess()
}
*/
module.exports = () =>{
  let post_text = $('#post_text').val()
  let textPreProcessor = new PreProcessor(post_text)
  textPreProcessor.preprocess()
  let tokens = textPreProcessor.tokens
  let html = ""
  $.each(tokens, (index, token) =>{
  	html += "<span class=\"label label-warning token-label\">" + token + "</span>"
  })
  $('#tokenized_string').html(html)
  global.tokens = textPreProcessor.tokens
}