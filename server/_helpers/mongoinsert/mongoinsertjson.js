var mongoose = require('mongoose');
var express = require("express");   
var router = express.Router();
var config = require('../config');
mongoose.connect(config.database_mlb);
var eyes = require('eyes');
var Account = require('../models/account');
var Query = require('../_helpers/mongoqueries/energyqueries');
var async = require('async');

module.exports.TOMONGOFROMXML = function(jSONObject)  {
  var post_model = Account;
  var parsed = JSON.parse(jSONObject);
  var newData = new post_model(parsed);
  Query.saveInDb(newData);
};

