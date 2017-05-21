let $ = global.$

class AudienceMatcher{
  
  constructor(audiences){
    this.audiences = audiences || []
  }

  match(audience2){
    let matched_audience = []
    $.each(this.audiences, (index, audience1) => {
      let matchScore = this.matchScore(audience2, audience1)
      if(matchScore > 0){
        matched_audience.push({audience: audience1, score: matchScore})
      } 
    })
    return matched_audience
  }

  matchScore(audience1, audience2){
    let matchScore = 0
    matchScore += audience1.matchCountry(audience2)
    matchScore += audience1.matchAge(audience2)
    matchScore += audience1.matchGender(audience2)
    
    return matchScore
  }

}

module.exports = AudienceMatcher