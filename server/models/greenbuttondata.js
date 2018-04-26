var mongoose = require('mongoose');

// Green Button upload schema
var greenButtonDataSchema = mongoose.Schema({
    //JSON model structure here
    updated: {
        type: Date,
        default: Date.now()
    }
});

var GreenButtonData = module.exports = mongoose.model('GreenButtonData', greenButtonDataSchema);

// Get GreenButtonData
module.exports.getGreenButtonData = function(callback, limit){
    GreenButtonData.find(callback).limit(limit);
}