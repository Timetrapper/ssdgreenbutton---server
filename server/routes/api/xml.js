var express = require("express");   
var router = express.Router();
const espiParser = require('espi-parser');
var concat = require('concat-stream');
var https = require('https');
var eyes = require('eyes');
var async =require('async');
var fs = require('fs');
var http = require('http');
var insertjsontomongo = require('../../_helpers/mongoinsert/mongoinsertjson');

module.exports.XMLREQUEST = function() {
// TODO: Add Timers, Add to
async.waterfall([
    function(callback) {
        http.get('http://localhost:4000/api/xml', function(res) {
            var response_data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response_data += chunk;
            });
            res.on('end', function() {
                callback(null, response_data)
            });
            res.on('error', function(err) {
                callback(err);
            });
        });
    },
    function(xml, callback) {
        //loggin data
        var newXML = espiParser(xml);
        
       JSON.stringify(newXML, function(err, result) {
           console.log("CALLBACK---START----");
            if (err) {
                callback(err);
            } else {
                console.log("CALLBACK------END-------");
                eyes.inspect(result);
                callback(null, result);
            }
        });
    }, 
    function(json, callback) {
       var jsonObject = JSON.stringify(json);
       insertjsontomongo.TOMONGOFROMXML(jsonObject);
       callback();
    }
], function(err, result) {
    if (err) {
        eyes.inspect(result);
        console.log('Got error');
        console.log(err);
    } else {
        console.log('Done.');
    }
});
}

function finished() {
    console.log("Finished");
}

