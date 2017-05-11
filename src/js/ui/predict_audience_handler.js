let $ = global.$
const ui_utils = require('./utils')
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

let showCities = (places) =>{
  let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", places.cities, "</span>")
  $('#demo_cities').html(html)
}
let showCountries = (places) =>{
  let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", places.countries, "</span>")
  $('#demo_countries').html(html)
}

let onPredictPlace = (text) => {
  try{
    let places = JSON.parse(text)
    showCities(places)
    showCountries(places)
  }
  catch(err){
    console.log(err)
  }
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
