var services = require('../../services');

function publishMessage(exchangeName, message, routingKey) {
    services.getRabbitMqConnection(function(connection) {
        var exchange = {
            name: exchangeName,
            opts: { durable: true, type: 'direct', autoDelete: false}
        };

        var ex = connection.exchange(exchange.name, exchange.opts, function(ex) {
            ex.publish(routingKey, message, {deliveryMode: 1});       
            console.log('Published message: ' + message);
        });
    });
};

exports.publishMessage = publishMessage;
