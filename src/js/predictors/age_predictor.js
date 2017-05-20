let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')

class AgePredictor{
  
  constructor(category){
    this.category = category
  }
  
  showAge(ageGroups){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", ageGroups, "</span>", ui_utils.displayAgeGroup)
    $('#demo_age_groups').html(html)
  }
  createAgeGroups(ageGroups){
    global.predictedAudience.ageGroups = ageGroups
    if(ageGroups.length > 0){
      global.predictedAudience.age_min = ageGroups[0].age_min
      global.predictedAudience.age_max = ageGroups[0].age_max
    }
  }

  onPredictAge(data){
    try{
      let ageGroups = JSON.parse(data)
      this.createAgeGroups(ageGroups)
      this.showAge(ageGroups)
    }
    catch(err){
      console.error(err)
    }
  }

  predict(){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('predict_age.py', this.category, this.onPredictAge.bind(this))

  }
}

module.exports = AgePredictor