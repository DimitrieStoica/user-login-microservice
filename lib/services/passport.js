var passport       = require('passport');
var BasicStrategy  = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer');
var User           = require('../models/userModel');
var userHelper     = require('../controllers/userHelper');
var jwt            = require('jwt-simple');
var moment         = require('moment');

module.exports = function(passport, tokenSecret) {
  
  passport.use(new BasicStrategy(

    //Login function
    function(username, password, next) {
      User.findOne({ username: username }, function(err, user) {
        if (err) return next(err);
        if (!user) {
          return next(null, false, {message: 'Incorrect username.' });
        }
        user.comparePassword(password, function(err, isMatch) {
          if (!isMatch) { 
            return next(null, false, {message: 'Incorrect password.' });
          }
          var expires = moment().add(1, 'days').valueOf();
          var token = jwt.encode({username: user.username, exp: expires},
              tokenSecret);
          return next(null, token);
        });
      });
    }
  ));

  passport.use(new BearerStrategy(

    //Token check function
    function(token, next) {
      if (!token) return next(null, false);
      try {
        var decoded = jwt.decode(token, tokenSecret);
        if (decoded.exp <= Date.now()) {
          var err =  new Error('Token has expired');      
          err.status = 400;
          return next(err);
        }

        userService.findUserByUsername(decoded.username, function(err, user) {
          if (!user) return next(null, false);
          return next(null, user);
        });
      }
      catch(err) {
        return next(null, false);
      }
    }
  ));
};
