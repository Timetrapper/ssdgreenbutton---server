var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
    feed: {
        id: {
            type: String
        },
        title: String,
        updated: Date,
        link: {
            href: String,
            rel: String
        },
        entries: {
            type: [{
                _id : false,
                id: String,
                links: {
                    type: [{
                        _id : false, 
                        href: String,
                        rel: String
                    }],
                    default: undefined
                },
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
                        IntervalReadings: {
                            type: [{
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
                            }],
                            default: undefined
                        }
                    }
                },
                published: Date,
                updated: Date
            }],
            default: undefined
        }
    }
});

var Account = module.exports = mongoose.model('Account', AccountSchema, 'greenbuttondata2'); 

module.exports.saveInDb = async function(inputJSON) {
    try {
        console.log("save new object in 'saveInDb'");
        var newAccount = new Account(inputJSON);
        let data = await newAccount.save();
        console.log("data is: " + JSON.stringify(data));
        //console.log("id is: " + data._id);
        return data._id;
    } catch (err) {
        console.log("** error: " + err);
    }
};

module.exports.updateDb = async function(inputJSON, userAccountId) {
    try {
        let objectId = new mongoose.Types.ObjectId(userAccountId);
        let document = await Account.findOne({ _id : objectId});
        if (document == null){
            //save json directly to db
            console.log("failed to find the document");
        } else {
            //update the document in db
            try {
                var inputIntervals;
                for(var i=0; i<inputJSON.feed.entries.length; i++){
                        if( inputJSON.feed.entries[i].title == "Interval Block - 1") {
                            inputIntervals = inputJSON.feed.entries[i].content.IntervalBlock.IntervalReadings;                        
                        }
                }
                let dbIntervals = await Account.aggregate([
                    {$match: { _id: objectId}},
                    {$unwind: "$feed"},
                    {$unwind:"$feed.entries"},
                    {$match: { "feed.entries.title": "Interval Block - 1"}},         
                    {$unwind:"$feed.entries.content"},         
                    {$unwind:"$feed.entries.content.IntervalBlock"},         
                    {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},         
                    {$group: {             
                        _id: "$_id",         
                        intervalReadings: {$addToSet: "$feed.entries.content.IntervalBlock.IntervalReadings"}         
                    }},         
                    {$project: { _id: 0, intervalReadings: 1 }}
                ]);
                var newIntervals = inputIntervals.concat(dbIntervals[0].intervalReadings);
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
                try{
                    let updateSuccess = await Account.update(
                        {
                            _id: objectId,
                            "feed.entries.title": "Interval Block - 1"
                        },
                        {$set: {
                            "feed.entries.$.content.IntervalBlock.IntervalReadings": newIntervals,
                            "feed.entries.$.content.IntervalBlock.interval.duration": newDuration,
                            "feed.entries.$.content.IntervalBlock.interval.start": newStart,
                            "feed.entries.$.updated": now
                        }}
                    );
                    console.log("update result: " + updateSuccess);
                    try{
                        let newAccount = await Account.find({_id: objectId});
                        return newAccount;
                    } catch (err) {
                        console.log("***** error: " + err);
                    }
                } catch (err) {
                    console.log("**** error: " + err);
                }
            } catch (err) {
                console.log("*** error: " + err);
            }
        }
    } catch (err) {
        console.log("* error: " + err);
        return null;
    }
    
};

module.exports.getAccountIntervalEntry = async function(userAccountId) { 
    console.log("In 'getAccountIntervalEntry'");

    try {
        let objectId = new mongoose.Types.ObjectId(userAccountId);
        let data = await Account.aggregate([
            {$match: { _id: objectId}}, 
            {$unwind: "$feed"},
            {$unwind:"$feed.entries"},
            {$match: { "feed.entries.title": "Interval Block - 1"}},
            {$project: { entry: "$feed.entries" }}
        ]);
        
        return data;
    } catch (err) {
        console.log("*** error: " + err);
        return null;
    }
};

module.exports.getReadingType = async function(userAccountId) { 
    console.log("In 'getReadingType'");
    
    try {
        let objectId = new mongoose.Types.ObjectId(userAccountId);
        let data = await Account.aggregate([
            {$match: { _id: objectId}}, 
            {$unwind: "$feed"},
            {$unwind:"$feed.entries"},
            {$unwind:"$feed.entries.content"},
            {$match: {"feed.entries.content.ReadingType": {$exists: true}}},
            {$project: { _id: 0, ReadingType: "$feed.entries.content.ReadingType"}}        ]);

        console.log("readingType: " + JSON.stringify(data));
        return data;
    } catch (err) {
        console.log("*** error: " + err);
        return null;
    }
};

/* 
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
            console.log("********data: " + data);
    });
};
*/














/* module.exports.getAccountHourlyUsage = function(id, begining, end, callback) { 
    Account.aggregate([
        {$unwind: "$feed"},
        {$match: { "feed.id": id}}, 
        {$unwind:"$feed.entries"},
        {$match: { "feed.entries.title": "Interval Block - 1"}},
        {$unwind:"$feed.entries.content"},
        {$unwind:"$feed.entries.content.IntervalBlock"},
        {$unwind:"$feed.entries.content.IntervalBlock.IntervalReadings"},
        {$match: { "feed.entries.content.IntervalBlock.IntervalReadings.timePeriod.start": {$gte: begining, $lt:end}}},
        {$project: { Intervals: "$feed.entries.content.IntervalBlock.IntervalReadings" }}
    ], function(err, data){
        if (err)
            throw err
            console.log(data);
        callback(null, data);
    });
};

module.exports.getAccountAggregatedUsage = function(begin, end, callback){
    console.log("In 'getAccountAggregatedUsage'");
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
            console.log("*** data: " + data);
        callback(null, data);
    });
}

 */
