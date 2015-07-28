var app     = require('../index.js');
var request = require('supertest')(app);

describe('/home api', function() {
  it('should return information about the service', function(done) {
    request
      .get('/')
      .expect({}, done);
  });
});
