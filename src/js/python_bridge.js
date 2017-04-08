const python_base = "./src/python/"
let spawn = global.require('child_process').spawn
class PythonBridge{
  constructor(){
  }

  run(fileName, param, callback){

    let filePath = python_base + fileName
    let pythonProcess = spawn('python', [filePath])
    let dataString = ""
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    })
    pythonProcess.stdout.on('end', function(){
      callback(dataString);
    });
    pythonProcess.stdin.write(JSON.stringify(param))
    pythonProcess.stdin.end()
  }

}
module.exports = PythonBridge
