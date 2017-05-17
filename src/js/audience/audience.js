let audience_utils = require('./utils')

class Audience{
  constructor(params, original_data){
    this.age_max = params.age_max
    this.age_min = params.age_min 
    this.genders = params.genders || []
    this.display_name = params.name || ''
    this.countries = (params.geo_locations && params.geo_locations.countries) || []
    this.original_data = original_data
  }

  matchAge(audience2){
    if(this.min_age < audience2.min_age) {
      if(this.max_age > audience2.max_age){
        //fully matching
      }
      else{
        //partially matching
      }
    }
    else if(this.max_age > audience2.max_age){
      // partially matching
    }   
  }
  matchCountry(audience2){
    if(audience_utils.matchArray(this.countries, audience2.countries)){
      // country match
    }
  }
  matchGenders(audience2){
    if(audience_utils.matchArray(this.genders, audience2.genders)){
      // country match
    } 
  }
}

module.exports = Audience
