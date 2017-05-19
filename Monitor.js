var mongoose = require("mongoose");

var monitorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createTime: {type: Date, default: Date.now},
    statInterval: { //the stat interval (in minutes) of the metrics
        type: Number,
        default: 5
    },
    aboveOrBelow: {
        type: String,
        enum: ['above', 'below'],
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    lastForTime: {
        type: Number, //if the monitor above or below the threshold lasts for 30 minutes, trigger the alarm
        default: 30
    },
    // The following fields are used for query metrics
    tag: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['count', 'time', 'error', 'msg']
    },
    appName: String,
    appVersion: String,
    hostname: String,       //ip address that generate this error
    osName: String
});

// indexes

monitorSchema.index({ tag: 1, name: 1});
monitorSchema.set('autoIndex', true);

// methods


module.exports = monitorSchema;