let $ = global.$
let PlacePredictor = require('../predictors/place_predictor')

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
  let place_predictor = new PlacePredictor()
  place_predictor.predictPlace(post_text)

  /*let reader = new BlogsDataReader()
  reader.read()
  */
}
