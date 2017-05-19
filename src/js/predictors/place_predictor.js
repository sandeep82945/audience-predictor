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
    this.addCountries(places.countries)
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", places.countries, "</span>", this.getCountryName)
    $('#demo_countries').html(html)
  }
  getCountryName(country){
    return country.name
  }
  addCountries(countries){
    global.predictedAudience.countries = countries
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