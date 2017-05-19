let audience_utils = require('./utils')
let $ = global.$
let countrynames = global.require('countrynames')

class Audience{
  constructor(params={}, original_data =null){
    this.age_max = params.age_max
    this.age_min = params.age_min 
    this.genders = params.genders || []
    this.interests = params.interests || []
    this.display_name = params.name || ''
    if(params.geo_locations){
      this.readGeoLocations(params.geo_locations)
    }
    //this.countries = (params.geo_locations && params.geo_locations.countries) || []
    this.original_data = original_data
  }

  readGeoLocations(geo_locations){
    this.countries = []
    if (geo_locations && geo_locations.countries){
      $.each(geo_locations.countries, (index, country_code) => {
        let name = countrynames.getName(country_code) || ''
        this.countries.push({name: name, code: country_code})
      })
    }
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
    if(audience_utils.searchArrays(this.countries, audience2.countries, audience_utils.matchCountryFn)){
      // country match
      return 10
    }
    return 0
  }
  matchGenders(audience2){
    if(audience_utils.searchArrays(this.genders, audience2.genders)){
      // Gender match
    } 
  }
  matchInterests(audience2){
    if(audience_utils.searchArrays(this.interests, audience2.interests)){
      // interests match
    } 
  }

}

module.exports = Audience
