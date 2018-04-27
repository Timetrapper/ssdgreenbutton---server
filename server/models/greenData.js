import { Schema } from "mongoose";
var config = require('../config');
var mongoose = require("mongoose");
mongoose.connect(config.database_mlb);
var db = mongoose.connection;

// Sub docs
var greenButtonDataSchema = new Schema ({

})

var 