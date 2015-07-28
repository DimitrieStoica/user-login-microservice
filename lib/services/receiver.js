var services = require('../../services');

module.exports = {

 subscribeMessage: function(exchangeName, routingKey, callback) {
  services.getRabbitMqConnection(function(connection) {

    var exchange = {
      name: exchangeName,
      opts: { durable: true, type: 'direct', autoDelete: false}
    };

    var queue = {
      name: '',
      opts: {exclusive: true, durable: true, autoDelete: false}
    };

    var ex = connection.exchange(exchange.name, exchange.opts, function(ex) {
      var q = connection.queue(queue.name, queue.opts, function(q) {
        q.bind(exchange.name, routingKey);
        q.on('queueBindOk', function() {
          q.subscribe(callback);
        });
      });
    });
  });
}

};
