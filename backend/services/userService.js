var mongoose = require('mongoose');
var User = require('../model/createModels');



module.exports = {

    saveClient: function (data) {

        var user = new User();
        user.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    },
    updateClient: function(data){

    },
    findId: function(params) {
        
    },
    delete: function(params) {
        
    }
};