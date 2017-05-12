let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')

class PlacePredictor{
  
  constructor(){
  }
  
  showCities(places){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", places.cities, "</span>")
    $('#demo_cities').html(html)
  }

  showCountries(places){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", places.countries, "</span>")
    $('#demo_countries').html(html)
  }

  onPredictPlace(data){
    try{
      let places = JSON.parse(data)
      this.showCities(places)
      this.showCountries(places)
    }
    catch(err){
      console.log(err)
    }
  }

  predict(post_text){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('predict_place.py', post_text, this.onPredictPlace.bind(this))
  }
}

module.exports = PlacePredictor