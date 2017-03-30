let spawn = global.require('child_process').spawn
class PythonBridge{
  constructor(){
  }

  run(file_name, param){
    param = [1,2,3,4]
    file_name = "./src/python/sum.py"
    let python_process = spawn('python', [file_name])
    let dataString = ""
    python_process.stdout.on('data', (data) => {
      dataString += data.toString();
    })
    python_process.stdout.on('end', function(){
      console.log('Sum of numbers=', dataString);
    });
    python_process.stdin.write(JSON.stringify(param))
    python_process.stdin.end()
    return dataString
  }

}
module.exports = PythonBridge
/*
let spawn =  
var spawn = require('child_process').spawn,
    py    = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';
    */