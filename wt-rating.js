//Need to learn  JS >D
var mongo = require('mongodb').MongoClient;
var COLLECTION = 'items';


var getNewAverage = function(quantity,currAvg,newPoint){

  var fCurrAvg = parseFloat(currAvg);
  var fNewPoint = parseFloat(newPoint);
  var fQuantity = parseFloat(quantity);

  var result =fCurrAvg + ((fNewPoint-fCurrAvg)/fQuantity);

  return result;

}

var findItem = function(db,item,cb){

  db.collection(COLLECTION)
    .findOne(item,function(err,doc){
      if(err) throw err;

      cb(null,doc);
    });
}


var updateAverage = function(db,findedDoc,newPoint,cb){
  var query = {link:findedDoc.link};

  var newFields ={link:findedDoc.link,
                  avgPoints:getNewAverage(findedDoc.quantity+1,findedDoc.avgPoints,newPoint),
                  quantity:findedDoc.quantity+1};

  db.collection(COLLECTION).findAndModify(query,[],newFields,{new:true},function(err,docUpdated){
    if (err) throw err;
    cb(null,docUpdated);
  });
}

var saveAvgToCollection = function(db,docQuery,newPoint,cb){
   findItem(db,docQuery,function(err,findedDoc){
      if (err) throw err;

      if (!findedDoc) { //Insert
        //Extend properties on the new item
        docQuery.avgPoints=newPoint;
        docQuery.quantity=1; //It can probably be setted automatically by the mongo engine.

        db.collection(COLLECTION).insert(docQuery,function(err,res){
          if(err) throw err;
          cb(null,res.ops[0]);
          return;
        });
      }else{          //Update
          updateAverage(db,findedDoc,newPoint,function(err,updated){
            if(err) throw err;
            cb(null,updated.value);
          })
      }
   });
}


var findAllItems = function(db,cb){
  db.collection(COLLECTION).find().toArray(function(err,documents){
    if(err) throw err;

    cb(null,documents);
  });
}

//Auth0 main callback --> Execution is wrapped by Auth0 between try/Catch so you can throw errors.
module.exports = function(context,callback){
    var link = context.data.link;
    var points = context.data.points;
    var colQuery = {link:context.data.link};

    mongo.connect(context.data.MONGODB, function(err,db){
      if(err) return callback(err);
      
      if (!link) { //If u don't send any link, we'll send you the entire list?
        findAllItems(db,function(err,totalList){
          if (err) return callback(err);

          callback(null,totalList);
          return;
        });
      }else {
        if (parseFloat(points)==points) { //Only accept NUMBERS
          saveAvgToCollection(db,colQuery,points,function(err,itemSaved){
            if (err) throw err;

            callback(null,itemSaved);
          });

        }else {
          throw 'Invalid Point';
        }
      }
    });

}
