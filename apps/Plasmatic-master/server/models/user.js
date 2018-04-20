var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  password: {
      type: String,
  },
  email: {
      type: String,
      index: true
  },
  firstName: {
      type: String,
  },
  lastName: {
      type: String
  },
  role: {
    type: String
  },
  creation_date: {
      type: Date
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  postal: {
    type: String
  },
  country: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.creation_date = Date.now();
          newUser.role = "member";
          newUser.save(callback);
      });
  });
}

module.exports.getUserByEmail = function(email, callback) {
  User.findOne({email: email}, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback); 
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) throw err;
      callback(null, isMatch);
  });
}

