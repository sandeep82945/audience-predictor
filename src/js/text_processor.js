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
    bridge.run('sum.py', [1,2,3,4], callback)
  }
}

module.exports = TextProcessor