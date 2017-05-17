let $ = global.$

class Utils{
  searchArrays(array1, array2){
    let matchFound = false
    $.each(array1, (item1) => {
      matchFound = matchFound || this._findinArray(item1, array2)
    })
    return matchFound
  }

  _findinArray(item1, array2){
    let matchFound = false 
    $.each(array2, (item2) => {
      if(item1.toString().toLower() === item2.toString().toLower()){
        matchFound = true 
      }
    })
    return matchFound
  }
}

module.exports = new Utils()