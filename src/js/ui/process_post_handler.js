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
  alert(textPreProcessor.tokens)
}