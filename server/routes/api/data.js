var express = require('express');
var router = express.Router();
var config = require('../../config');
var moment = require('moment');
var passport = require('passport');

var Account = require("../../models/account");
/*
router.get("/:id", passport.authenticate('jwt', {session: false}), function(req, res){
    Account.getAccountIntervalEntry(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.err(err));
});
*/

router.get("/:id", passport.authenticate('jwt', {session: false}), async function(req, res){
    try {
        let data = await Account.getAccountIntervalEntry(req.params.id);
        let dataReadingType = await Account.getReadingType(req.params.id);
        res.json({ "ReadingType": dataReadingType[0], "intervalReadings": data[0]});
    } catch (err) {
        res.err(err)
    }
});

/* 
router.get("/:id", passport.authenticate('jwt', {session: false}), function(req, res){
    Account.getAccountIntervalEntry(req.params.id, function(err, data) {
        if (err)
            res.send(err);
        console.log("this is data: "+ JSON.stringify(data));
        res.json(data);
    });
});
 */

router.post("/upload/", passport.authenticate('jwt', {session: false}), async function(req, res){
    try {
        let data = await Account.updateDb(JSON.parse(req.body.newData), "5af368cf9037ae4e24d17625");
        res.json(data);
    } catch (err) {
        res.render('error', { error: err })
    }
});

module.exports = router;