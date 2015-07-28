var services    = require('../../services');
var mongodb     = require( 'mongodb' );
var MongoClient = mongodb.MongoClient;

module.exports = {

  deleteAllNews: function(req, res) {
    services.getMongoDbConnection(function(error, db) {
        db.collection('articles', function(error, collection) {
        collection.remove({}, function(error, item) {
         if (error) {
           res.send('An error has occurred !\n');
         } if (item.result.n == 0) {
           res.send('Database is empty !\n');
         } else {
          console.log('Success deleting all news articles.');
          console.log(item.result.n)
          res.send(item);
          
         };
        }); 
      });
    });
  },

 deleteByTitle: function(req, res) {
    services.getMongoDbConnection(function(error, db) {
      var title = req.params.title;
        db.collection('articles', function(error, collection) {
        collection.remove({title:title}, {safe:true}, function(error, item) {
         if (error) {
          res.send('An error has occurred !\n');
         } if (item.result.n == 0) {
           res.send('Database is empty !\n');
         } else {
          console.log('Success deleting: ' + title);
          res.send(item);
         };
        });
      });
    });
  } 

}
