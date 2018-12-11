var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = require('./user');
var pet = require('./pet');

var ObjectId = mongoose.Schema.Types.ObjectId;

var consultation = new Schema({
    _id: ObjectId,
    clerk:  [user],
    client: [user],
    pet:   [pet],
    veterinary: [user],
    scheduling: Date,
    enchiridion: String,   
    recipe: String
});

module.exports = consultation;