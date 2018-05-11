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

var Account = module.exports = mongoose.model('Account', AccountSchema, 'greenbuttondata'); 
