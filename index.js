var MetricSchema = require('./Metric');

exports.Metric = function (conn) {
    return conn.model('Metric', MetricSchema);
};