let audience_utils = require('./utils')
let $ = global.$
let consts = require('../consts')
let countrynames = global.require('countrynames')

class Audience{
  constructor(params={}, original_data =null){
    this.age_max = params.age_max || params.age
    this.age_min = params.age_min 
    this.genders = params.genders || []

    this.interests = params.interests || []
    this.countries = params.countries || []
    this.readParams(params)
    this.original_data = original_data
  }

  readParams(params){
    this.name = params.name || ''
    this.readCoutries(params)
    this.readFlexibleSpecs(params)
    this.readGenders()
    this.ageGroups = [{age_min:params.age_min, age_max: params.age_max}] 
  }
  readGenders(){
    let newGenders = []
    $.each(this.genders, (index, gender) =>{
      let code = gender.code || gender
      let name = consts.genders[code]
      if(name){
        newGenders.push({name:name, code: code})
      }
    })  
    this.genders = newGenders 
  }
  readCoutries(params){
    if(params.geo_locations && params.geo_locations.countries){
      let countries = params.geo_locations.countries
      $.each(countries, (index, country_code) => {
        let name = countrynames.getName(country_code) || ''
        this.countries.push({name: name, code: country_code})
      })
    }
  }

  readFlexibleSpecs(params){
    if(params && params.flexible_spec && params.flexible_spec){
      let flexible_spec = params.flexible_spec
      $.each(flexible_spec, (index, spec) =>{
        if(spec.interests){
          this.readInterests(spec.interests)
        }
      })
    }
  }
  readInterests(interests){
    $.each(interests, (index, fb_interests) => {
      //let interest_obj = audience_utils.findinArray(fb_interests, consts.interests,  (fb_interest, interest) =>{
      //return audience_utils.matchString(fb_interest.name, interest.name)
      //})
      //if(interest_obj){
      this.interests.push(fb_interests.name)
      //}
    })
  }

  matchAge(audience2){
    if(this.age_min <= audience2.age_min) {
      if(this.age_max >= audience2.age_max){
        //fully matching
        return 20
      }
      else{
        //partially matching
        return 10
      }
    }
    else if(this.age_max >= audience2.age_max){
      // partially matching
      return 10
    } 
    return 0  
  }
  matchCountry(audience2){
    if(audience_utils.searchArrays(this.countries, audience2.countries, audience_utils.matchCountryFn)){
      // country match
      return 30
    }
    return 0
  }
  matchGender(audience2){
    if(audience_utils.findinArray({id:0, name:"both"}, this.genders, audience_utils.matchGenderFn))
      return 10 // predicted is both
    if(audience_utils.searchArrays(this.genders, audience2.genders),audience_utils.matchGenderFn){
      // Gender match
      return 10
    } 
    return 0
  }
  matchInterest(audience2){
    if(audience_utils.searchArrays(this.interests, audience2.interests)){
      // interests match
      return 50
    }
    return 0 
  }

}

module.exports = Audience
