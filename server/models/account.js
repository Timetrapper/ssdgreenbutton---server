var mongoose = require("mongoose");

//var IntervalReading = require("./intervalReading");

var AccountSchema = new mongoose.Schema({
    feed: {
        id: {
            type: String, 
            index: {unique: true}
        },
        title: String,
        updated: Date,
        link: {
            href: String,
            rel: String
        },
        entries: [{
            _id : false,
            id: String,
            links: [{
                _id : false, 
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
                        _id : false, 
                        timePeriod: {
                            duration: {
                                type: Number
                            },
                            start: {
                                type: Number
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

var Account = module.exports = mongoose.model('Account', AccountSchema, 'greenbuttondata'); 