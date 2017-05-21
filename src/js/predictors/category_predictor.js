let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')
let AgePredictor = require('../predictors/age_predictor')
let GenderPredictor = require('../predictors/gender_predictor')
let consts = require('../consts')

class CategoryPredictor{
  
  constructor(){
  }
  
  addCategories(categories){
    global.predictedAudience.interests = []
    let interests = consts.interests

    $.each(categories, (index, category) =>{
      let interest_obj = interests[category]
      if(!interest_obj || !interest_obj.interests)
        return;
      this.addInterests(interest_obj.interests)
    })
  }

  addInterests(interests){
    $.each(interests, (index, interest)=>{
      global.predictedAudience.interests.push(interest)
    })
  }

  showCategories(categories){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", categories, "</span>")
    $('#demo_categories').html(html)
  }

  showInterests(){
    let interests = global.predictedAudience.interests
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", interests, "</span>")
    $('#demo_interests').html(html)
  }

  otherPredicts(categories){
    $.each(categories,(index, category) =>{
      let age_predictor = new AgePredictor(category)
      age_predictor.predict()
      let gender_predictor = new GenderPredictor(category)
      gender_predictor.predict()
    })
  }

  onPredictcategory(data){
    try{
      let categories = JSON.parse(data)
      this.addCategories(categories)
      this.otherPredicts(categories)
      this.showCategories(categories)
      this.showInterests()
    }
    catch(err){
      console.log(err)
    }
  }

  predict(post_text){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('naive_category.py', post_text, this.onPredictcategory.bind(this))
  }
}

module.exports = CategoryPredictor
