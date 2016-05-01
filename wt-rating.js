
var mongo = require('mongodb').MongoClient;

/*
var Rating = function(link,avgPoints){
    this.link:link,
    this.avgPoints:avgPoints,
    this.quantity=0;
}
*/
var getNewAverage = function(quantity,currAvg,newPoint){
  console.log('Getting new average');
  return currAvg + ((newPoint-currAvg)/quantity);
}

var saveAvgToCollection = function(db,docQuery,newPoint,cb){
    console.log('Getting Collection:' + docQuery);
    //db.collection('items').findAndModify(docQuery,[],
    db.collection('items').findAndModify({link:'putotototo'},[],
                                         {

                                           $avgPoints:getNewAverage(1,10,newPoint)
                                         },
                                         {upsert:true,
                                          new:false},function(err,doc){
                                                if (err) {
                                                  console.log(err);
                                                  throw err;
                                                }
                                                console.log(doc);
                                                  cb(null,doc);
                                              }
  );


}

module.exports = function(context,callback){
  var link = context.data.link;
  var points = context.data.points;
  //console.log(context.data);
  var colQuery = {link:context.data.link};
  mongo.connect(context.data.MONGODB, function(err,db){

    if(err) return callback(err);
    //console.log(colQuery);
    saveAvgToCollection(db,colQuery,points,function(err,newAvg){
      if (err) callback(err)
      else
        callback(null,newAvg);
    });
    //var newAvg=  db;

  });
}
