var mongoose = require('mongoose');
var express = require("express");   
var router = express.Router();
var config = require('../../config');
mongoose.connect(config.database_mlb);
var eyes = require('eyes');
var Account = require('../../models/account');
var Query = require('../../_helpers/mongoqueries/energyqueries');
var async = require('async');
var User = require('../../models/user');

module.exports.TOMONGOFROMXML = async function(jSONObject, currentUser)  {
  var post_model = Account;
  var parsed = JSON.parse(jSONObject);
  console.log("currentUser: " + JSON.stringify(currentUser));
  //var newData = new post_model(parsed);
  if (!currentUser.hasOwnProperty("dataID")) {
    console.log("currentUser.dataID is null");
    var newDataID = await Account.saveInDb(parsed);
    console.log("newDataID: "+newDataID);
    User.addDataID(currentUser, newDataID);
  } else {
    console.log("currentUser.dataID is " + currentUser.dataID);
    Account.updateDb(parsed, currentUser.dataID);
  }
  //Query.saveInDb(newData);
};

