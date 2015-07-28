module.exports ={

  populateUser: function(req) {
    return user = {
      firstName: req.body.firstName,
      lastName:  req.body.lastName,
      username:  req.body.username,
      password:  req.body.password,
      photo:     req.body.photo,
      role:      req.body.role
    };
  }
};
