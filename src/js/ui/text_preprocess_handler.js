let $ = global.$
const ui_utils = require('./utils')
const TextProcessor = require('../preprocessor')

let dataReader = global.sample_data_reader

let showTokens = (selector)=>{
  
  let tokens = global.sampletextProcessor.tokens
  let html = ui_utils.repeat("<span class=\"label label-warning token-label\">", tokens, "</span>")
  $(selector).html(html)
}

class PreprocessHandler{
 
  showFirstSentence(){
    let first_key  = Object.keys(dataReader.blogs_data)[0]
    let first_data = dataReader.blogs_data[first_key]
    this.first_sentence = first_data[0]
    global.sampletextProcessor = new TextProcessor(this.first_sentence)
    $('#demo_first_sentence').text(this.first_sentence)   
  }
  tokenize(){
    global.sampletextProcessor.tokenize()
    showTokens('#demo_data_tokens')
  }
  stopWords(){
    global.sampletextProcessor.removeStopWords()
    showTokens('#demo_data_stop_words')
  }
  lemmatize(){
    global.sampletextProcessor.lemmatize(() =>{
      showTokens('#demo_data_lemmatize')
    })
  }
}   

module.exports = new PreprocessHandler()