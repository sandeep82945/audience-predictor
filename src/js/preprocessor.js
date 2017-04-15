let Natural = require('natural')
const stopWord = require('stopword')
  
class PreProcessor{
  constructor(text){
    this._original_text = text
  }
  preprocess(){
    this.tokenize()
    this.removeStopWords()
  }
  tokenize(){
    let tokenizer = new Natural.WordTokenizer();
    this.tokens = tokenizer.tokenize(this._original_text)
  }
  removeStopWords(){
    this.tokens = stopWord.removeStopwords(this.tokens)
  }
}

module.exports = PreProcessor