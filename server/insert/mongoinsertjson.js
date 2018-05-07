var mongoose = require('mongoose');
var express = require("express");   
var router = express.Router();
var config = require('../config');
mongoose.connect(config.database_mlb);
var Account = require('../models/account');
var eyes = require('eyes');

module.exports.TOMONGOFROMXML = function(jSONObject)  {
  var post_model = Account;
  var parsed = JSON.parse(jSONObject);
  var newData = new post_model(parsed);
  newData.save(function(err) {
      if(err) {
        // TODO: Check for Unexpected error.
          throw err;
      }
      else {
          console.log('Inserted');
      }
  });
}

