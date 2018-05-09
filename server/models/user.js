var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); 

// user schema
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  password: {
      type: String,
  },
  role: {
      type: String,
  },
  creationdate: {
      type: Date
  }
});

var User = module.exports = mongoose.model('User', UserSchema);