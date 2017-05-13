let Natural = global.require('natural')
const stopWord = global.require('stopword')
let Lemmer = global.require('lemmer');
let $ = global.$
  
class PreProcessor{
  constructor(text, callback){
    this._original_text = text
    this.callback = callback
  }
  preprocess(){
    this.tokenize()
    this.removeStopWords()
    this.lemmatize()
  }
  tokenize(){
    let tokenizer = new Natural.WordTokenizer();
    this.tokens = tokenizer.tokenize(this._original_text)
  }
  removeStopWords(){
    this.tokens = stopWord.removeStopwords(this.tokens)
  }
  stem(){
    let stemmed_tokens = []
    let stemmer = Natural.PorterStemmer;
    $.each(this.tokens, (index, word) => {
      let stemmed_word = stemmer.stem(word);
      if(stemmed_tokens.indexOf(stemmed_word) === -1){
        stemmed_tokens.push(stemmed_word)
      }      
    })
    this.tokens = stemmed_tokens
  }
  lemmatize(callback){
    this.callback = callback || this.callback
    Lemmer.lemmatize(this.tokens, (err, words) =>{
      this.tokens = words
      if(this.callback)
        this.callback(this.tokens)
    });
  }
}

module.exports = PreProcessor