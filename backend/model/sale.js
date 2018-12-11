var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var salesman = require('./user');

var sale = new Schema({
    _id: ObjectId,
    salesman: [salesman],
    date_sale: {type: Date, default: Date.now },
    total_value: Number
});

module.exports = sale;