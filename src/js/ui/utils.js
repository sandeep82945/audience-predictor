let $ = global.$

class Utils {
  repeat(openingTag, elements, closingTag, processFn) {
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
  displayAgeGroup(audience){
    return `${audience.age_min}-${audience.age_max}`
  }

  audienceParamHtml(audience){
    
    let html =''
    
    let countries_html = this.repeat("<span class=\"label label-warning token-label\">", audience.countries, "</span>",(country) =>{
      return country.name
    })
    html += `<p>Countries: ${countries_html}</p>`
    
    let age_html = this.displayAgeGroup(audience)
    html += `Age Group: <span class="label label-warning token-label">
    ${age_html}</span>`   

    let interests_html = this.repeat("<span class=\"label label-warning token-label\">", audience.interests, "</span>", (interest) =>{
      return interest
    })
    html += `<p>Interests: <span class="label label-warning token-label">${interests_html}</span></p>`
 

    let gender_html = this.repeat("<span class=\"label label-warning token-label\">", audience.genders, "</span>", (gender) =>{
      return gender.name
    })
    html += `<p>Gender: <span class="label label-warning token-label">${gender_html}</span></p>`
 
    
    return html
  }

  audienceHtml(audience){
    if(audience.audience){
      audience = audience.audience
    }
    let param_html = this.audienceParamHtml(audience)
    return `<td><p><img class="audience-icon" src="css/audience.png">${audience.name}</p></td><td>${param_html}</td>`
  }


  displayAudiences(selector, audiences){
    let headers = ['Audience Name', 'Properties']
    this.displayTable(selector, headers, audiences, this.audienceHtml.bind(this))
  }

  tableHeader(header_items){
    let inner_html = this.repeat('<th>', header_items, '</th>')
    return `<theader><tr>${inner_html}</tr></thead>` 
  }

  tableBody(items, rowDisplayFn){
    let html = this.repeat('<tbody>', items, '</tbody>', rowDisplayFn) 
    return html
  }

  tableHtml(headers, items, rowDisplayFn) {
    let tableHeader = this.tableHeader(headers)
    let tableBody = this.tableBody(items, rowDisplayFn)
    return `<table>${tableHeader}${tableBody}</table>`
  }

  displayTable(selector, headers, items, rowDisplayFn){
    let html = this.tableHtml(headers, items, rowDisplayFn)
    $(selector).html(html)
  }

}
module.exports = new Utils()