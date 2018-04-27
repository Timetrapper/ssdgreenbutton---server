//import { mongo } from "mongoose";
var config = require('../config');
var mongoose = require("mongoose");
mongoose.connect(config.database_mlb);
var db = mongoose.connection;

var schema = mongoose.Schema({
    timePeriod: {
        duration: {
            type: Number
        },
        start: {
            type: Date
        }
    },
    cost: {
        type: Number
    },
    value: {
        type: Number
    }
});

var IntervalReading = db.model('IntervalReading', schema);

module.exports = IntervalReading;