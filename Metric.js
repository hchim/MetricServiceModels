var mongoose = require("mongoose");
var mapFuns = require('./MapFunctions');
var reduceFuns = require('./ReduceFunctions');

var metricSchema = mongoose.Schema({
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
    createTime: {type: Date, default: Date.now},
    count: Number,  //count type
    time: Number,  //time type, in miliseconds
    message: String,  // error and msg type
    hostname: String,       //ip address that generate this error
    device: {
        model: String,
        brand: String,
        serial: String,
    },
    "os": {
        os_name: String,
        sdk_int: Number,
        os_type: String,
        fingerprint: String,
    }
});

// indexes

metricSchema.index({ tag: 1, createTime: 1});
metricSchema.index({ ip: 1, createTime: 1});
metricSchema.set('autoIndex', true);

// methods

metricSchema.statics.distinctMetrics = function(query, callback, page, numPerPage) {
    if (!numPerPage) {
        numPerPage = 10;
    }
    if (!page) {
        page = 0;
    }
    var aggregate = this.aggregate();
    aggregate.match(query)
        .group({ _id: '$tag'})
        .limit(numPerPage)
        .skip(numPerPage * page)
        .exec(callback);
};

metricSchema.statics.searchMetrics = function(query, callback, page, numPerPage) {
    if (!numPerPage) {
        numPerPage = 10;
    }
    if (!page) {
        page = 0;
    }

    this.find(query)
        .limit(numPerPage)
        .skip(numPerPage * page)
        .sort({createTime: -1})
        .exec(callback);
};

/**
 * MapReduce query on metrics collection.
 * @param query
 * @param statInterval
 * @param callback It takes two parameters error and results.
 * @param map map function
 * @param reduce reduce function, default is countMetricReduce
 */
metricSchema.statics.mapReduceQuery = function(query, callback, map, reduce) {
    this.mapReduce({
        query: query,
        sort: {createTime: 1},
        map: map ? map : mapFuns.metric5MMap,
        reduce: reduce ? reduce : reduceFuns.countMetricReduce,
    }, callback);
};

module.exports = metricSchema;