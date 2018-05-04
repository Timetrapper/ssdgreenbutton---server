var express = require('express');
var router = express.Router();
var config = require('../../config');
var moment = require('moment');

//var mongojs = require("mongojs");
//var db = mongojs(config.database, ["greenbuttondata"]);

var Account = require("../../models/account");
//var IntervalReading = require("../../models/intervalReading");

router.get("/:id", passport.authenticate('jwt', {session: false}), function(req, res){
    Account.getAccountIntervalEntry(req.params.id, function(err, data) {
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});

/* 
router.get("/hourly/:id", function(req, res){
    console.log("in the function");
    console.log("id: "+ req.params.id);
    Account.getAccountHourlyUsage(req.params.id, function(err, data) {
        console.log('here again');
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});

router.get("/daily/:unixtime", function(req, res){

    var beginOfDay = (moment.unix(req.params.unixtime).startOf('day'))/1000;
    var endOfDay   = (moment.unix(req.params.unixtime).endOf('day'))/1000;
    console.log('beginning of the Day: ' + beginOfDay);
    console.log('end of the Day: ' + endOfDay);

    Account.getAccountAggregatedUsage(beginOfDay, endOfDay, function(err, data){
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});

router.get("/weekly/:unixtime", function(req, res){

    var beginOfWeek = (moment.unix(req.params.unixtime).utc().startOf('week'))/1000;
    var endOfWeek   = (moment.unix(req.params.unixtime).utc().endOf('week'))/1000;
    console.log('beginning of the Week: ' + beginOfWeek);
    console.log('end of the Week: ' + endOfWeek);

    Account.getAccountAggregatedUsage(beginOfWeek, endOfWeek, function(err, data){
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});

router.get("/monthly/:unixtime", function(req, res){

    var beginOfMonth = (moment.unix(req.params.unixtime).utc().startOf('month'))/1000;
    var endOfMonth   = (moment.unix(req.params.unixtime).utc().endOf('month'))/1000;
    console.log('beginning of the Month: ' + beginOfMonth);
    console.log('end of the Month: ' + endOfMonth);

    Account.getAccountAggregatedUsage(beginOfMonth, endOfMonth, function(err, data){
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
 */

module.exports = router;