let $ = global.$

class Utils{
  searchArrays(array1, array2, compareFn = null){
    let matchFound = null
    $.each(array1, (index, item1) => {
      matchFound = matchFound || this.findinArray(item1, array2, compareFn)
    })
    return matchFound
  }

  findinArray(item1, array2, compareFn){
    let matchFound = null 
    compareFn = compareFn || this.matchString
    $.each(array2, (index, item2) => {
      if(compareFn(item1, item2)){
        matchFound = item2 
      }
    })
    return matchFound
  }

  matchString(item1, item2){
    return item1.toString().toLowerCase() === item2.toString().toLowerCase()
  }

  matchCountryFn(country1, country2){
    return country1.code === country2.code
  }
  
  matchGenderFn(gender1, gender2){
    return gender1.code === gender2.code
  }
}

module.exports = new Utils()