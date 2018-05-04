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

module.exports.getAccountIntervalEntry = function(id, callback) { 
    Account.aggregate([
        {$unwind: "$feed"},
        {$match: { "feed.id": id}}, 
        {$unwind:"$feed.entries"},
        {$match: { "feed.entries.title": "Interval Block - 1"}},
        {$project: { entry: "$feed.entries" }}
    ], function(err, data){
        if (err)
            throw err
            console.log(data);
        callback(null, data);
    });
};

module.exports.saveInDb = function(newJSON, callback) {
    Account.findOne({'feed.id': newJSON.feed.id}, function(err, document){
        if (err)
            throw err
        if (document == null){
            //save json directly to db
            newJSON.save(callback);
        } else {
            //update the document in db
            var newIntervals;
            for(var i=0; i<newJSON.feed.entries.length; i++){
                    if( newJSON.feed.entries[i].title == "Interval Block - 1") {
                            newIntervals = newJSON.feed.entries[i].content.IntervalBlock.IntervalReadings;                        
                    }
            }
            //var newIntervals = newJSON.feed.entries.content.IntervalBlock.IntervalReadings;
            Account.aggregate([
                {$unwind: "$feed"},         
                {$match: { "feed.id": newJSON.feed.id}},
                {$unwind:"$feed.entries"},         
                {$match: { "feed.entries.title": "Interval Block - 1"}},         
                {$unwind:"$feed.entries.content"},         
                {$unwind:"$feed.entries.content.IntervalBlock"},         
                {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},         
                {$group: {             
                    _id: "$feed.id",         
                    intervalReadings: {$addToSet: "$feed.entries.content.IntervalBlock.IntervalReadings"}         
                }},         
                {$project: { _id: 0, intervalReadings: 1 }}
            ], function(err, dbIntervals){
                if (err){
                    throw err;
                } else {
                    //console.log(newIntervals);
                    //console.log(dbIntervals[0].intervalReadings);
                    var newIntervals = newIntervals.concat(dbIntervals[0].intervalReadings)
                    var newDuration = 0;
                    var newStart = dbIntervals[0].intervalReadings[0].timePeriod.start;
                    var now = new Date();
                    var strNow = now.toISOString();
                    for(var i=0; i<newIntervals.length; ++i) {
                        for(var j=i+1; j<newIntervals.length; ++j) {
                            if(newIntervals[i].timePeriod.start === newIntervals[j].timePeriod.start)
                                newIntervals.splice(j--, 1);
                        }
                        newDuration = newDuration + parseInt(newIntervals[i].timePeriod.duration);
                        if ( newIntervals[i].timePeriod.start < newStart)
                            newStart = newIntervals[i].timePeriod.start;
                    }
        
                    Account.update(
                        {
                                "feed.id": newJSON.feed.id,
                                "feed.entries.title": "Interval Block - 1"
                        },
                        {$set: {
                                "feed.entries.$.content.IntervalBlock.IntervalReadings": newIntervals,
                                "feed.entries.$.content.IntervalBlock.interval.duration": newDuration,
                                "feed.entries.$.content.IntervalBlock.interval.start": newStart,
                                "feed.entries.$.updated": now
                        }}
                    , function(err, updated){
                        if (err)
                                throw err
                        console.log(updated);
                        Account.find({'feed.id': newJSON.feed.id}, function(err, result){
                                if (err)
                                        throw err;
                                res.json(result);
                        });
                    });
                }
            });
        }
    });
};