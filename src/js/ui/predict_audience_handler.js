let $ = global.$
//let AgePredictor = require('../predictors/age_predictor')
//let BlogsDataReader = require('../data/blogs_data_reader')
//let TextProcessor = require('../text_processor')
let PythonBridge = require('../python_bridge')
/*
let predictAge = (post_text)=>{
  let text_processor = new TextProcessor(post_text)
  text_processor.preprocess()
}
*/

let onPredictPlace = (text) => {
  alert(text)
}

let predictPlace = (post_text)=>{
  let pythonBridge = new PythonBridge()
  pythonBridge.run('predict_place.py', post_text, onPredictPlace)
}


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
  predictPlace(post_text)

  /*let reader = new BlogsDataReader()
  reader.read()
  */
}
