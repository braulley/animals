
var mongoose = require('mongoose');
mongoose.connect('mongodb://braulley:test123@ds239359.mlab.com:39359/clinic_vet');


var db = mongoose.connection;

module.exports = db;
