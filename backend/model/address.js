var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var address = new Schema({
    _id: ObjectId,
    street:  { type: String, required: true },
    Number: {type: Number, required: true },
    zipCode:   {type: String, required: true},
    complement: String,    
    neighborhood:  String,
    city: {type: String, required: true},
    state: {type: String, required: true},
    coutry: {type: String, required: true},
    create_at: { type: Date, default: Date.now }
});

module.exports = address;