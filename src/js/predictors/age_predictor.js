let  KNN = global.require('ml-knn')

class AgePredictor{
  constructor(){
    this.knn = new KNN()
  }
  train(){
    var trainingSet = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
    var predictions = [0, 0, 0, 1, 1, 1];
 
    this.knn.train(trainingSet, predictions);
  }
  predict(){
    this.train()
    let dataset = [[0, 0, 0],
               [2, 2, 2]]
 
    let ans = this.knn.predict(dataset)
    alert(ans)
  }

}
module.exports = AgePredictor
