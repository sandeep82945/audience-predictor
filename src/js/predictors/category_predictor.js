let $ = global.$
const ui_utils = require('../ui/utils')
let PythonBridge = require('../python_bridge')

class CategoryPredictor{
  
  constructor(){
  }
  
  showCategories(categories){
    let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", categories, "</span>")
    $('#demo_categories').html(html)
  }

  onPredictcategory(data){
    try{
      let categories = JSON.parse(data)
      this.showCategories(categories)
    }
    catch(err){
      console.log(err)
    }
  }

  predict(post_text){
    let pythonBridge = new PythonBridge()
    pythonBridge.run('predict_category.py', post_text, this.onPredictcategory.bind(this))
  }
}

module.exports = CategoryPredictor