var express = require('express');
var config  = require('./config');
var path    = require('path');
var app     = express();
var server  = require('http').createServer(app);

var passport       = require('passport');
var passportConfig = require('./lib/services/passport')(passport, config.jwtSecret);

var user = require('./lib/controllers/user');

app.use(passport.initialize());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());  
app.disable('etag');

app.post('/create', user.userCreate);

app.get('/', function (req, res) {
  res.send('Hello there !\n');
});

app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

module.exports = server;
