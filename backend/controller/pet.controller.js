var express = require('express');
const router = express.Router();
const db = require('../config/db.config.js');
const Op = db.Sequelize.Op;

var Pet = db.Pet;
var User = db.User;

router.post('/save', save);
router.get('/',getAllPets);

module.exports = router;


function save(req, res, next) {
    let pet = req.body.data;
    User.findOne({
		where: {
			name: pet.nameClient
		}
	}).then(user => {
        console.log('',user)
        if(!user){
            return res.status(500).send('Without User');
        }
        let id = user.dataValues.id;

        Pet.create({
            name: pet.name,
            breed: pet.breed ,
            weight: pet.weight,
            height: pet.height ,
            typeOfAnimal: pet.typeOfAnimal ,
            observation: pet.observation ,
            user_id: id,
        }).then(pet => {
            res.status(200).send('Pet registrado com sucesso !!!');
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.send(500).send(err);
    })
}

function getAllPets(req, res, next) {
    Pet.findAndCountAll()
  .then(result => {
    console.log(result);
  });    
}