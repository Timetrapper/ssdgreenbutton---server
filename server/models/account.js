var mongoose = require("mongoose");
//var IntervalReading = require("./intervalReading");

var AccountSchema = new mongoose.Schema({
    feed: {
        id: String,
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
                    _id : false, 
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

module.exports.getUser = function(callback) { 
    console.log('Im in getUser');
    Account.find({ "feed.id": "2"});
    console.log('Done');
};

module.exports.getAccountHourlyUsage = function(callback) { 
    Account.aggregate([
        {$unwind:"$feed"},
        {$match: { "feed.id": "2"}},
        {$unwind:"$feed.entries"},
        {$match: { "feed.entries.title": "Interval Block - 1"}},
        {$unwind:"$feed.entries.content"},
        {$unwind:"$feed.entries.content.IntervalBlock"},
        {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},
        {$match: { "feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start": {$gte: "1493175601", $lt:"1493190001"}}},
        {$project: { Intervals: "$feed.entries.content.IntervalBlock.IntervalReadings" }}
    ]);
};