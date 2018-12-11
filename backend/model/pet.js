var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = require('./user');

var ObjectId = mongoose.Schema.Types.ObjectId;

var pet = new Schema({
    _id: ObjectId,
    name:  { type: String, required: true },
    type:  { type: String, required: true },
    description: String,
    observation: String,
    heigth: Number,
    width: Number,
    weigth:   Number,
    breed: String,
    user: [user]
});

module.exports = pet;