var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

function register(req, res, next) {
    userService._insert(req.body.user)
        .then(() => res.send('Usuário Cadastrado com sucesso'))
        .catch(err => next(err));
}

function update(req, res, next) {

    userService._update(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}


function getAll(req, res, next) {
    userService._get(req.body)
    .then(data =>  res.json(data));
}

function _delete(req, res, next) {
    userService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// routes
router.get('/', getAll);
router.post('/register', register);
router.put('/update', update);
router.delete('/remove', _delete);


module.exports = router;