var mongoose = require('mongoose');
var address = require('./address');
var user = require('./user');
var pet = require('./pet');
var product = require('./product');
var sale = require('./sale');
var consultation = require('./consultation');
var itemSale = require('./item_value');


var models = {
    Address: mongoose.model('address', address),
    User: mongoose.model('user', user),
    Pet: mongoose.model('pet', pet),
    Product: mongoose.model('product', product),
    Sale: mongoose.model('sale', sale),
    ItemSale: mongoose.model('itemSale', itemSale),
    Consultation: mongoose.model('consultation', consultation),
};

module.exports = models;