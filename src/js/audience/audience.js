let audience_utils = require('./utils')
let $ = global.$
let consts = require('../consts')
let countrynames = global.require('countrynames')

class Audience{
  constructor(params={}, original_data =null){
    this.age_max = params.age_max
    this.age_min = params.age_min 
    this.genders = params.genders || []

    this.interests = params.interests || []
    this.name = params.name || ''
    this.countries = params.countries || []
    this.readParams(params)
    this.original_data = original_data
  }

  readParams(params){
    this.readCoutries(params)
    this.readFlexibleSpecs(params)
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
      let interest_obj = audience_utils.findinArray(fb_interests, consts.interests,  (fb_interest, interest) =>{
        return audience_utils.matchString(fb_interest.name, interest.name)
      })
      if(interest_obj){
        this.interests.push(interest_obj)
      }
    })
  }

  matchAge(audience2){
    if(this.min_age < audience2.min_age) {
      if(this.max_age > audience2.max_age){
        //fully matching
        return 50
      }
      else{
        //partially matching
        return 20
      }
    }
    else if(this.max_age > audience2.max_age){
      // partially matching
      return 20
    } 
    return 0  
  }
  matchCountry(audience2){
    if(audience_utils.searchArrays(this.countries, audience2.countries, audience_utils.matchCountryFn)){
      // country match
      return 10
    }
    return 0
  }
  matchGenders(audience2){
    if(audience_utils.searchArrays(this.genders, audience2.genders)){
      // Gender match
      return 50
    } 
    return 0
  }
  matchInterests(audience2){
    if(audience_utils.searchArrays(this.interests, audience2.interests)){
      // interests match
      return 50
    } 
  }

}

module.exports = Audience
