var app    = require('./index');
var config = require('./config');
var bole   = require('bole');
var services = require('./services');

bole.output({level: "debug", stream: process.stdout});
var log = bole("server");
log.info({env: process.env.NODE_ENV}, "Server process starting");

services.getMongoDbConnection(function(err, db) {
  if (db) {
    log.info("Connected to MongoDB on: " + config.mongodbURL);

//    services.getRabbitMqConnection(function(conn) {
//      if (conn) {
//      log.info("Connected to RabbitMQ on: " + config.rabbitmqURL);

      app.listen(config.express.port, config.express.ip, function(error) {
        if(error) {
          log.error("Unable to listen for connections", error);
          process.exit(10);
        }
        log.info("Server is listening on http://" +
        config.express.ip + ":" + config.express.port);
      });
//    } else {
//        log.error("Unable to connect to RabbitMQ");
//      }
    }
  else {
    console.log("Unable to connect to MongoDB");
  }
});
