/**
 * Calculate the average value.
 * @param key
 * @param values
 * @returns {number}
 */
exports.timeMetricReduce = function (key, values) {
    var total = Array.sum(values);
    return total / values.length; // average time in ms
}

/**
 * Count the total numbers of values.
 * @param key
 * @param values
 * @returns {*}
 */
exports.countMetricReduce = function (key, values) {
    var total = Array.sum(values);
    return total; // times/5m
}