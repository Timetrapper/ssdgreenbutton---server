// Importing Passport, strategies, and config
var JwtStrategy = require('passport-jwt').Strategy; 
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/');

module.exports = function(passport) {
  var jwtOptions = {  
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
  };
  passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log("jwt_payload._id: "+JSON.stringify(jwt_payload));
    User.findOne({_id: jwt_payload.data._id}, function(err, user) {
      if (err) { 
          return done(err, false); 
      }
      if (user) {
        console.log("passport user: "+user);
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};