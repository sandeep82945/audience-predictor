//let $ = global.$
/////let AgePredictor = require('../predictors/age_predictor')
let BlogsDataReader = require('../data/blogs_data_reader')
/*let TextProcessor = require('../text_processor')

module.exports = () =>{
  let post_text = $('#post_text').val()
  let text_processor = new TextProcessor(post_text)
  text_processor.preprocess()
}
*/
/*
module.exports = () =>{
  let age_predictor = new AgePredictor()

  alert(age_predictor.predict())
  //global.tokens = textPreProcessor.tokens
}
*/
/*
let callback = (data) =>{

}*/
module.exports = () =>{
  let reader = new BlogsDataReader()
  reader.read()
}
