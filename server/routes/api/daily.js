var express = require('express');
var router = express.Router();
var config = require('../../config');

var mongojs = require("mongojs");
//var db = mongojs(config.database_mlb, ["data"]);
var db = mongojs(config.database_mlb, ["greenbuttondatas"]);

var Account = require("../../models/account");
//var IntervalReading = require("../../models/intervalReading");

router.get("/", function(req, res){
    db.greenbuttondatas.aggregate([
        {$unwind: "$data"},
        {$unwind:"$data.feed"},
        {$match: { "data.feed.id": "urn:uuid:79f97f63-967b-474b-bf10-e3d4b47531e1"}},
        {$unwind:"$data.feed.entries"},
        {$match: { "data.feed.entries.title": "Interval Block - 1"}},
        {$unwind:"$data.feed.entries.content"},
        {$unwind:"$data.feed.entries.content.IntervalBlock"},
        {$unwind:"$data.feed.entries.content.IntervalBlock.IntervalReadings"},
        {$match: { "data.feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start": {$gte: "1521057601", $lt:"1521064801"}}},
        {$project: { Intervals: "$data.feed.entries.content.IntervalBlock.IntervalReadings" }}
    ],
    function(err, data){
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});

router.get("/user", function(req, res){
    Account.getUser(function(err, data){
        console.log('Im back');
        if (err)
            res.send(err);
        res.json(data);
    });
});


module.exports = router;