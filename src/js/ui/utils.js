let $ = global.$
module.exports = {
  repeat(openingTag, elements, closingTag, processFn){
    let html = ""
    $.each(elements, (index, elem)=>{
      let opeining_text = (typeof openingTag === "function")?
                          openingTag(elem) : openingTag

      let closing_text = (typeof closingTag === "function")?
                                  closingTag(elem) : closingTag

      let elemText =  (processFn) ? processFn(elem) : elem
      html = html + opeining_text + elemText + closing_text  
    })
    return html
  }
}