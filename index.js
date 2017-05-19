var MetricSchema = require('./Metric');
var Map = require('./MapFunctions');
var Reduce = require('./ReduceFunctions');

exports.Metric = function (conn) {
    return conn.model('Metric', MetricSchema);
};

exports.Map = Map;

exports.Reduce = Reduce;