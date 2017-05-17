let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')

class AgePredictor{
  
  constructor(){
  }
  
  showAge(ageGroups){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", ageGroups, "</span>")
    $('#demo_age_groups').html(html)
  }

  onPredictAge(data){
    try{
      let ageGroups = JSON.parse(data)
      this.showAge(ageGroups)
    }
    catch(err){
      console.error(err)
    }
  }

  predict(post_text){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('predict_age.py', post_text, this.onPredictAge.bind(this))

  }
}

module.exports = AgePredictor