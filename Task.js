var mongoose = require("mongoose");
var ObjectId = mongoose.schema.ObjectId;

var taskSchema = mongoose.Schema({
    _monitor: {
        type: ObjectId,
        ref: 'Monitor'
    },
    scheduledExecuteTime: Date,
    nextExecuteTime: Date,
    status: {
        type: String,
        enum: ['scheduled', 'ready']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// indexes

taskSchema.index({ startTime: 1});
taskSchema.set('autoIndex', true);

// methods

module.exports = taskSchema;