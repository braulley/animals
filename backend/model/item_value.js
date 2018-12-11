var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var sale = require('./sale');
var product = require('./product');

var item_sale = new Schema({
    _id: ObjectId,
    sale: [sale],
    date_sale: {type: Date, default: Date.now },
    product: [product],
    amount: Number,
    unitValue: Number,
    totalValue: Number
});

module.exports = item_sale;