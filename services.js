//var amqp    = require('amqp');
var mongodb = require('mongodb').MongoClient;
var config  = require('./config');

var mongodbConn;

function getMongoDbConnection(callback) {
  if (mongodbConn && mongodbConn.state == 'connected') {
    callback(null, mongodbConn);
  } else {
    mongodb.connect(config.mongodbURL, function(err, conn) {
      if (err) {
        console.log("Failed to connect to MongoDB: ", err);
        callback(err, null);
      } else {
        mongodbConn = conn;
        mongodbConn.on("close", function(error){
          mongodbConn = null;
          console.log("Connection to MongoDB was closed!");
        });
        callback(err, mongodbConn);
      }
    });
  }
}

//var rabbitmqConnection;
//
//function getRabbitMqConnection(callback) {
//    var rabbitmqURL = config.rabbitmqURL;
//
//    if (rabbitmqConnection) {
//        callback(rabbitmqConnection);
//    } else {
//        var conn = amqp.createConnection({url: rabbitmqURL});
//        conn.on('ready', function() {
//            rabbitmqConnection = conn;
//            callback(rabbitmqConnection);
//        });
//        conn.on('closed', function() {
//            rabbitmqConnection = null;
//        });
//    }
//}

exports.getMongoDbConnection  = getMongoDbConnection;
//exports.getRabbitMqConnection = getRabbitMqConnection;
