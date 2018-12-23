const db = require('../config/db.config.js');
const User = db.User;
 
checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use
	User.findOne({
		where: {
			username: req.body.username
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Falha - Usename existe!");
			return;
		}
		
		// -> Check Email is already in use
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Email Existente !");
				return;
			}
				
			next();
		});
	});
}
 
const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
 
module.exports = signUpVerify;