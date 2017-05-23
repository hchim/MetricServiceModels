var MetricSchema = require('./Metric');
var MonitorSchema = require('./Monitor');
var TaskSchema = require('./Task');
var Map = require('./MapFunctions');
var Reduce = require('./ReduceFunctions');

exports.Metric = function (conn) {
    return conn.model('Metric', MetricSchema);
};

exports.Monitor = function (conn) {
    return conn.model('Monitor', MonitorSchema);
};

exports.Task = function (conn) {
    return conn.model('Task', TaskSchema);
};

exports.Map = Map;

exports.Reduce = Reduce;