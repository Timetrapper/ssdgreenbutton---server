var express = require('express'); 
var config = require('../config');
var mongojs = require("mongojs");
var passport = require('passport');

var db = mongojs(config.database_mlab, ['boats']);
// get all boats

var router = express.Router();

router.get("/boats", (req, res, next) => {
    db.boats.find( (err, data) => {
        if (err)
            res.send(err);
        
        res.json(data);
    })
});

// Find one boat by id
router.get("/boats/:id", (req, res, next) => {
    db.boats.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// add boat
router.post("/boats", (req, res, next) => {
    var boat = req.body;

    if (!boat.BoatName || !boat.BoatLengthInFeet
        || !boat.BoatYear || !boat.BoatCapacityInPeople ||
        !boat.BoatPictureUrl || !boat.IsRented)  {
        res.status(400);
        res.json(
            {"error": "Bad data, could not be inserted into the database."}
        )
    } else {
        db.boats.save(boat, function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    }
});

// delete boat
router.delete("/boats/:id", (req, res, next) => {
    db.boats.remove({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);


    });
});

// Rent Boat
router.get("/boats/rent/:id", (req, res, next) => {
    db.boats.update({_id: mongojs.ObjectId(req.params.id)}, {$set: {"IsRented":"Yes"}},function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

//Un-Rent Boaty
router.get("/boats/expire/:id",(req,res,next) => {
db.boats.update({_id: mongojs.ObjectId(req.params.id)}, {$set: {"IsRented":"No"}},function(err, data){
    if (err) {
        res.send(err);
    }
    res.json(data);
});
});

// update boat 
router.put("/boats/:id", (req, res, next) => {
    var boats = req.body;
    var changedBoat = {};

    if (boats.BoatName) {
        changedBoat.BoatName = boats.BoatName;
    }

    if (boats.BoatCapacityInPeople) {
        changedBoat.BoatCapacityInPeople = boats.BoatCapacityInPeople;
    }

    if (boats.BoatLengthInFeet) {
        changedBoat.BoatLengthInFeet = boats.BoatLengthInFeet
    }

    if(boats.BoatPictureUrl) {
        changedBoat.BoatPictureUrl = boats.BoatPictureUrl
    }

    if(boats.BoatYear) {
        changedBoat.BoatYear = boats.BoatYear
    }

    if(boats.IsRented) {
        changedBoat.IsRented = boats.IsRented
    }

    if (Object.keys(changedBoat).length==0) {
        res.status(400);
        res.json(
            {"error": "Bad Data"}
        )        
    } else {
        db.boats.update({_id: mongojs.ObjectId(req.params.id)}, changedBoat,{},function(err, data){
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
});

module.exports = router;