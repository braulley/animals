var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var consultation = new Schema({
    _id: ObjectId,
    name: String,
    value: Number,
    amount: Number
});

module.exports = consultation;