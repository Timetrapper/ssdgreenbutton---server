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

module.exports.getUser = function(callback) { 
    console.log('Im in getUser');
    Account.find({ "feed.id": "2"});
    console.log('Done');
};

module.exports.getAccountHourlyUsage = function(id, callback) { 
    Account.aggregate([
        {$unwind: "$feed"},
        {$match: { "feed.id": id}}, 
        {$unwind:"$feed.entries"},
        {$match: { "feed.entries.title": "Interval Block - 1"}},
        {$unwind:"$feed.entries.content"},
        {$unwind:"$feed.entries.content.IntervalBlock"},
        {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},
        {$match: { "feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start": {$gte: 1521172801, $lt:1521187201}}},
        {$project: { Intervals: "$feed.entries.content.IntervalBlock.IntervalReadings" }}
    ], function(err, data){
        if (err)
            throw err
            console.log(data);
        callback(null, data);
    });
};

module.exports.getAccountAggregatedUsage = function(begin, end, callback){
    Account.aggregate([
        {$unwind:"$feed"},
        {$match: { "feed.id": "Michael:uuid:79f97f63-967b-474b-bf10-e3d4b47531e1" }},
        {$unwind:"$feed.entries"},
        {$match: { "feed.entries.title": "Interval Block - 1"}},
        {$unwind:"$feed.entries.content"},
        {$unwind:"$feed.entries.content.IntervalBlock"},
        {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},
        {$match: { "feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start": {$gte: begin, $lt: end}}},
        {$group: { 
            _id: "$_id",
            duration: {$sum: "$feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.duration"},
            start: {$min: "$feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start"},
            value: {$sum: "$feed.entries.content.IntervalBlock.IntervalReadings.value"}
        }} ,
        {$project: {
            intervalReading:{
                timePeriod:{
                    duration: "$duration",
                    start: "$start"
                },
                value: "$value"
            }

        }}
    ], function(err, data){
        if (err)
            throw err
            console.log(data);
        callback(null, data);
    });
}