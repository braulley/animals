var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/save', function(req, res, next){
  userController.post('register',req.body)
  console.log(req.body);
});

module.exports = router;
