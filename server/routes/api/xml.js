var express = require("express");   
var router = express.Router();
const espiParser = require('espi-parser');
var concat = require('concat-stream');
var https = require('https');
var eyes = require('eyes');
var async =require('async');
var fs = require('fs');
var http = require('http');
var insertjsontomongo = require('../../insert/mongoinsertjson');

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
        console.log("pat");
        var testXML  = JSON.stringify(xml);
        console.log(testXML);
        console.log("****");
        console.log("espiParser");

        var newXML = espiParser(xml);
        var stringifiedXML = JSON.stringify(newXML);
        /*
        console.log("NEW XML FROM ESPI");
        console.log(newXML);
        console.log("END XML FROM ESPI");

        console.log("NEW jSON FROM ESPI");
        console.log(stringifiedXML);
        console.log("END jSON FROM ESPI");
        */

       JSON.stringify(newXML, function(err, result) {
           console.log("CALLBACK---START----");
            if (err) {
                callback(err);
            } else {
                console.log("CALLBACK------END-------");
                eyes.inspect(result);
                callback(null,result);
            }
        });
    }, 
    function(json, callback) {
       var jsonObject = JSON.stringify(json);
       console.log('JSON OBJECT -*-*-*-*-*-*-*');
       eyes.inspect(jsonObject);
       //eyes.inspect(jsonObject);
       insertjsontomongo.TOMONGOFROMXML(jsonObject);
       //eyes.inspect(json);
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