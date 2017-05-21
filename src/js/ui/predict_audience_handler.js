let $ = global.$
let PlacePredictor = require('../predictors/place_predictor')
let CategoryPredictor = require('../predictors/category_predictor')
let Audience = require('../audience/audience')


//let AgePredictor = require('../predictors/age_predictor')
//let BlogsDataReader = require('../data/blogs_data_reader')
//let TextProcessor = require('../text_processor')

/*
let predictAge = (post_text)=>{
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

module.exports = () =>{
  let post_text = $('#post_text').val()
  //predictAge(post_text)
  global.predictedAudience = new Audience()
  let place_predictor = new PlacePredictor()
  place_predictor.predict(post_text)

  let category_predictor = new CategoryPredictor()
  category_predictor.predict(post_text)
  $('.predicted-audience-holder').show()
  $('.matching-audience-holder').show()
  
  // let age_predictor = new AgePredictor()
  // age_predictor.predict(post_text)

  /*let reader = new BlogsDataReader()
  reader.read()
  */
}
