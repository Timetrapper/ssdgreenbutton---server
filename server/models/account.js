//import { mongo } from "mongoose";
var config = require('../config');
var mongoose = require("mongoose");
mongoose.connect(config.database_mlb);
var db = mongoose.connection;

var data = require('../tor-energy-quota.json');

//var IntervalReading = require("../models/intervalReading");

var schema = mongoose.Schema({
    feed: {
        id: String,
        title: String,
        updated: Date,
        link: {
            href: String,
            rel: String
        },
        entries: [{
            id: String,
            links: [{
                href: String,
                rel: String
            }],
            title: String,
            content: {
                UsagePoint: {
                    ServiceCategory: {
                        kind: Number
                    },
                    ServiceDeliveryPoint: Object
                },
                LocalTimeParameters: {
                    dstEndRule: String,
                    dstOffset: Number,
                    dstStartRule: String,
                    tzOffset: Number
                },
                MeterReading: Object,
                ReadingType: {
                    accumulationBehaviour: Number,
                    commodity: Number,
                    flowDirection: Number,
                    intervalLength: Number,
                    kind: Number,
                    phase: Number,
                    powerOfTenMultiplier: Number,
                    uom: Number
                },
                IntervalBlock: {
                    interval: {
                        duration: Number,
                        start: Number
                    },
                    IntervalReadings: [{
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
                    }]
                }
            },
            published: Date,
            updated: Date
        }]
    }
});

var Account = db.model('Account', schema);

module.exports = Account; 

