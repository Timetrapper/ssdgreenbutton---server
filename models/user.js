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
  dataID: String,
  role: {
      type: String,
  },
  creationdate: {
      type: Date
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.addDataID = function(user, dataID, callback) {
    console
    let userId = new mongoose.Types.ObjectId(user._id);
    User.update(
        { _id: userId },
        { $set: { dataID: dataID }}, function(data, err){
            console.log(JSON.stringify(data));
        },
        callback);
};
  
module.exports.getUserByEmail = function(email, callback) {
    User.findOne({email: email}, callback);
}; 
  
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback); 
};
  
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};
