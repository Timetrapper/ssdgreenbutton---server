var express = require('express');
var router = express.Router();
var config = require('../../config');
var moment = require('moment');
var passport = require('passport');
var handleXMLToJSON = require('.//xml');

var Account = require("../../models/account");
/*
router.get("/:id", passport.authenticate('jwt', {session: false}), function(req, res){
    Account.getAccountIntervalEntry(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.err(err));
});
*/

router.get("/data/:id", passport.authenticate('jwt', {session: false}), async function(req, res){
    try {
        let data = await Account.getAccountIntervalEntry(JSON.stringify(req.params.id));
        let dataReadingType = await Account.getReadingType(JSON.stringify(req.params.id));
        res.json({ "ReadingType": dataReadingType[0], "intervalReadings": data[0]});
    } catch (err) {
        res.send(err)
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

router.get("/upload", passport.authenticate('jwt', {session: false}), async function(req, res){

    //Call XML Parse Request
    try {
        var currentUser = JSON.parse(JSON.stringify(req.user));
        var currentUserID = currentUser._id;
        console.log("current user: " + currentUser);
        console.log("id: " + currentUserID);
        handleXMLToJSON.XMLREQUEST(currentUser);
    } catch (err) {
        console.log("error : " + err);
    }
/* 
    try {
        let data = await Account.updateDb(JSON.parse(req.body.newData), "5af368cf9037ae4e24d17625");
        res.json(data);
    } catch (err) {
        res.render('error', { error: err })
    }
     */
});

module.exports = router;