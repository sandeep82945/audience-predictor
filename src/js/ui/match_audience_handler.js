//let $ = global.$
//const ui_utils = require('./utils')
let AudienceMatcher = require('../audience/audience_matcher')

class MatchAudienceHandler{
  
  display(audiences){
    console.log(audiences)
  }

  match(){
    let fbAudiences = global.fb_audiences
    let predictedAudience = global.predictedAudience
    let matchedAudiences = []
    
    if(fbAudiences && predictedAudience){
      let audienceMatcher = new AudienceMatcher(fbAudiences)
      matchedAudiences = audienceMatcher.match(predictedAudience) 
    }
    this.display(matchedAudiences)
  }
}

let matchAudienceHandler = new MatchAudienceHandler()
module.exports = matchAudienceHandler.match