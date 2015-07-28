var services    = require('../../services');
var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;
var userModel   = require('../models/userModel');
var userHelper  = require('./userHelper');

module.exports = {
  userCreate: function(req, res) {
    services.getMongoDbConnection(function(error, db) {  
      var user = userModel.populateUser(req);
      console.log('Adding user ' + user.username + ".");
        console.log(user.password)
        user.password = userHelper.encryptPassword(user.password, function(error, encryptedPassword) {
         if (error) {
              res.send('An error has occurred !');
         } else {
        console.log(encryptedPassword)
          db.collection('users', function(error, collection) {
            collection.insert(user, {safe:true, unique:true,}, function(error, result) {
              if (error) {
                res.send('An error has occurred !');
              } else {
                console.log('Success adding user ' + user.username + ".");
                res.send(result[0]);
            };
          });
        });
      };
   });
  });
 }
}
