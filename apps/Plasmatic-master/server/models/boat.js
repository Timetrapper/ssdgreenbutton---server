var mongoose = require('mongoose');

var BoatSchema = new mongoose.Schema({
    BoatName: {
       type: String
   },
   BoatLengthInFeet: {
       type: String,
   },
   BoatYear: {
       type: String, 
   },
   BoatCapacityInPeople: {
       type: String,
   },
   BoatPictureUrl: {
    type: String,
    },
   IsRented: {
    type: String,
    }
});

var Boat = module.exports = mongoose.model('Boats', BoatSchema);

/*
module.exports.createBoat = function(newBoat, callback) {
        newBoat.BoatCapacityInPeople = "";
        newBoat.BoatName = "";
        
}
*/
module.exports.getBoatByName = function(BoatName, callback) {
  Boat.findOne({BoatName: BoatName}, callback);
}

module.exports.getBoatById = function(id, callback) {
  Boat.findById(id, callback); 
}