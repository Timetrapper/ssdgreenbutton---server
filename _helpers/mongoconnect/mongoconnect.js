var config = require('../../config');
var mongoose = require('mongoose');
mongoose.connect(config.database_mlb);
var Account = require('../../models/account');
// Mlabs

module.exports.CONNECTTODB = function() {
mongoose.connect(config.database_mlb).then(function(){
    console.log("successfully connected to db");
    console.log("database name: " + mongoose.connection.db.databaseName);
}, function(){
    console.log("failed to connected to db");
}); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
}