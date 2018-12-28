var express = require('express');
const router = express.Router();
const db = require('../config/db.config.js');
var User = db.User;
const Address = db.Address;
const Op = db.Sequelize.Op;
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const verifySignUp = require('../routes/verifySignUp.js');
const verifyToken = require('../routes/verifyJwtToken.js');

router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail], signup);
router.post('/signin', signin);
router.get('/', getAll);
router.get('/getId:userId', getById);
router.put(`/update:userId`, update);
router.delete(`/remove:userId`, _delete);

module.exports = router;

function signup(req, res) {
	// Save User to Database
	console.log("Processing func -> SignUp");
	let address = req.body.user.address;
	let contact = req.body.user.contact;

	Address.create({
		street: address.street,
		number: address.number,
		zipCode: address.zipCode,
		complement: address.complement,
		neighborhood: address.neighborhood,
		city: address.city,
		state: address.state,
		local: address.local,
	}).then(data => {
		let idAddress = parseInt(data.dataValues.id);
		console.log('COntact', contact);
		User.create({
			name: contact.name,
			username: contact.userName,
			registerCode: contact.registerCode,
			nacionality: contact.nacionality,
			dateBirth: Date(contact.dateBirth),
			maritalStatus: contact.maritalStatus,
			sex: contact.sex,
			crmv: contact.crmv,
			comission: parseFloat(contact.comission).toFixed(2),
			salary: parseFloat(contact.salary).toFixed(2),
			phone: contact.phone,
			phone1: contact.phone1,
			email: contact.email,
			password: bcrypt.hashSync(contact.password, 8),
			type: contact.type,
			address_id: idAddress,
		}).then(user => {
			console.log(user);
			res.send("User registered successfully!");
		}).catch(err => {
			res.status(500).send("Fail! Error User -> " + err);
		})
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

function signin(req, res) {
	console.log("Sign-In");
	console.log(req.body);
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		console.log(user);
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

		var token = jwt.sign({ id: user.id }, process.env.SECRET, {
			expiresIn: 86400 // expires in 24 hours
		});

		res.status(200).send({ auth: true, accessToken: token });

	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

function getAll(req, res, next) {
	User.findAll().then(users => {
		res.status(200).json(users);
	}).catch(err => {
		res.status(500).send('Error ->' + err);
	});
}

async function getById(req, res, next) {
	let id = req.body.id;
	await User.findById(id).then(users => {
		res.status(200).json(users);
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

async function update(req, res, next) {
	await User.update(
		{ name: req.body.name },
		{ username: req.body.username },
		{ registerCode: req.body.registerCode },
		{ hash: req.body.hash },
		{ nacionality: req.body.nacionality },
		{ dateBirth: req.body.dateBirth },
		{ maritalStatus: req.body.maritalStatus },
		{ sex: req.body.sex },
		{ crmv: req.body.crmv },
		{ comission: req.body.comission },
		{ salary: req.body.salary },
		{ phone: req.body.phone },
		{ phone1: req.body.phone1 },
		{ email: req.body.email },
		{ password: bcrypt.hashSync(req.body.password, 8) },
		{ officer: req.body.officer },
		{ returning: true, where: { id: req.params.userId } }
	)
		.then(function ([rowsUpdate, [updatedUser]]) {
			res.json(updatedUser);
		})
		.catch(next);
}

async function _delete(req, res, next) {

	await User.destory({
		where: { id: req.params.userId }
	})
		.then(deletedUser => {
			res.json(deletedUser);
		}).catch(next);

}