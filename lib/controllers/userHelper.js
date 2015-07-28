var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = {
  encryptPassword: function(password, callback) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
      if (error) return callback(error);
      bcrypt.hash(password, salt, function(error, hash) {
        if (error) return callback(error);
        password = hash;
        callback(null, password);
      });
    });  
  },

  comparePassword: function(potentialPassword, password, callback) {
    bcrypt.compare(potentialPassword, password, function(err, isMatch) {
      if (error) return callback(error);
      callback(null, isMatch);
    });
  },
}
