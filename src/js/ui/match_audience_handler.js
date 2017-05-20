//let $ = global.$
const ui_utils = require('./utils')
let AudienceMatcher = require('../audience/audience_matcher')


  
let display = (audiences) =>{
  ui_utils.displayAudiences('#matching_audiences', audiences)
  console.log(audiences)
}

let match = () => {
  let fbAudiences = global.fb_audiences
  let predictedAudience = global.predictedAudience
  let matchedAudiences = []
  
  if(fbAudiences && predictedAudience){
    let audienceMatcher = new AudienceMatcher(fbAudiences)
    matchedAudiences = audienceMatcher.match(predictedAudience) 
  }
  display(matchedAudiences)
}


module.exports = match