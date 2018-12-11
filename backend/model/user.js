var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address = require('./address');

var ObjectId = mongoose.Schema.Types.ObjectId;

var user = new Schema({
    _id: ObjectId,
    name:  { type: String, required: true },
    username:  { type: String, required: true, unique:true },
    registerCode: {type: String, unique:true , required: true },
    date_birth:   {type: Date, required: true},
    hash: { type: String, required: true },
    password: { type: String },
    email: String,
    telephone1: {type: String, required: true },
    telephone2: String,   
    telephone3: String,
    crmv:  String,
    commission: Number,
    nacionality: String,
    marital_status: {type: String, required: true },
    sex: String,
    ocupation: String,
    salary: Number,
    type: { type: String, required: true ,enum : ['C','A','V','S']},
    address: [address]
});
user.set('toJSON', { virtuals: true });


module.exports = user;