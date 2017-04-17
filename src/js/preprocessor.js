let Natural = global.require('natural')
const stopWord = global.require('stopword')
let Lemmer = global.require('lemmer');
let $= global.$
  
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
  lemmatize(){
    Lemmer.lemmatize(this.tokens, (err, words) =>{
      this.tokens = words
    });
  }
}

module.exports = PreProcessor