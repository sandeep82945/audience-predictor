let PythonBridge = require('./python_bridge')
class TextProcessor{
  constructor(text){
    this._original_text = text
  }

  preprocess(){
    let bridge = new PythonBridge()
    let callback = (data) =>{
      alert(data)
    }
    bridge.run('tokenize.py', this._original_text, callback)
  }
}

module.exports = TextProcessor