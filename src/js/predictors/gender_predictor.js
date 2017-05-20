let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')

class GenderPredictor{
  
  constructor(category){
    this.category = category
  }
  
  showGender(genders){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", genders, "</span>", (gender) =>{
      return gender.name
    })
    $('#demo_genders').html(html)
  }
  createGenders(genders){
    global.predictedAudience.genders = genders
  }

  onPredictGender(data){
    try{
      let gender = JSON.parse(data)
      this.createGenders(gender)
      this.showGender(gender)
    }
    catch(err){
      console.error(err)
    }
  }

  predict(){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('predict_gender.py', this.category, this.onPredictGender.bind(this))

  }
}

module.exports = GenderPredictor