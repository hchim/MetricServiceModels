/**
 * Return the map function that map documents of every 5 minutes to the same key.
 * @param statInterval time in milliseconds
 */
exports.metric5MMap = function () {
    var key = Math.round(this.createTime.getTime() / 300000);
    var val = this.type == 'time' ? this.time : this.count;
    emit(key, val);
}