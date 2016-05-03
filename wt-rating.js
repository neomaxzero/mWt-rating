//Need to learn  JS >D
var mongo = require('mongodb').MongoClient;
var COLLECTION = 'items';
var getNewAverage = function(quantity,currAvg,newPoint){
  console.log('Getting new average');
  return currAvg + ((newPoint-currAvg)/quantity);
}

var findItem = function(db,item,cb){
  console.log(item);
  db.collection(COLLECTION)
    .findOne(item,function(err,doc){
      if(err) throw err;

      cb(null,doc);
    });
}

var saveAvgToCollection = function(db,docQuery,newPoint,cb){
   findItem(db,docQuery,function(err,findedDoc){
      if (err) throw err;

      if (!findedDoc) { //Insert
        //Extend properties on the new item
        docQuery.avgPoints=newPoint;
        docQuery.quantity=1; //It can probably be setted automatically by the mongo engine.
        console.log(docQuery);
        db.collection(COLLECTION).insert(docQuery,function(err,res){
          if(err) throw err;
          cb(null,res);
          return;
        });
      }else{          //Update
        
      }
   });


}

module.exports = function(context,callback){
  try {
    var link = context.data.link;
    var points = context.data.points;
    var colQuery = {link:context.data.link};

    mongo.connect(context.data.MONGODB, function(err,db){
      if(err) return callback(err);
      saveAvgToCollection(db,colQuery,points,function(err,itemSaved){
        if (err) throw err;
        console.log('FROM MAIN CALLBACK');
        callback(null,itemSaved);
      });


      });
  } catch (e) {
    callback('Exiting with error: '+e,null);
  }

}
