let $ = global.$
let Preprocessor = require('preprocessor')
//let Natural = global.require('natural')

class FeatureExtractor{
  constructor(data){
    this.data = data
    this.features = []
  }
  extract(){
    $.each(this.data, (index, sentence) =>{
      this.process(sentence)
    })
  }
  process(sentence){

    let textPreProcessor = new Preprocessor(sentence.toLowerCase)
    textPreProcessor.preprocess()
    let tokens = textPreProcessor.tokens
    console.log(tokens)
  }
}

module.exports = FeatureExtractor