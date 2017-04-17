let $ = global.$
module.exports = {
  repeat(openingTag, elements, closingTag){
    let html = ""
    $.each(elements, (index, elem)=>{
      html = html + openingTag + elem + closingTag
    })
    return html
  }
}