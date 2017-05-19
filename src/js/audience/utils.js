let $ = global.$

class Utils{
  searchArrays(array1, array2, compareFn = null){
    let matchFound = false
    $.each(array1, (item1) => {
      matchFound = matchFound || this._findinArray(item1, array2, compareFn)
    })
    return matchFound
  }

  _findinArray(item1, array2, compareFn){
    let matchFound = false 
    compareFn = compareFn || this.matchString
    $.each(array2, (item2) => {
      if(compareFn(item1, item2)){
        matchFound = true 
      }
    })
    return matchFound
  }

  matchString(item1, item2){
    return item1.toString().toLower() === item2.toString().toLower()
  }

  matchCountryFn(country1, country2){
    return country1.code === country2.code
  }
}

module.exports = new Utils()