var mongoose = require("mongoose");

var IntervalReadingSchema = new mongoose.Schema({
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

var IntervalReading = module.exports = mongoose.model('IntervalReading', IntervalReadingSchema); 

/* module.exports.getHourlyIntervals = function(start, finish, callback) { 
    User.find({ "timePeriod.start" : { $gte: start, $lt: finish }}, callback); 
}  */
