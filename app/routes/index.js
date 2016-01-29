var express = require('express');
var router = express.Router();
var User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwtsecret="SADFKLJETQ543934JKEFMLSDAFMASDGJ45";

router
.post('/login',function(req, res) {
	User.findOne({email: req.body.email},'email password',function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		}
		if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			}
		}
		var token = jwt.sign({email:user.email},
			jwtsecret, {
			expiresInMinutes: 2880 // expires in 2 Days
		});
		res.json({
			success: true,
			message: 'Auth Token',
			token: token
		});
	});
})
.post('/register',function(req,res){
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.username = req.body.username;
	user.password = req.body.password;
	user.save(function(err) {
	if (err) {
		if (err.code == 11000)
		return res.json({ success: false, message: 'A user with that username or email already exists. '});
		else
		return res.send(err);
	}
	res.json({ message: 'Registered!, Now Login to get started' });
	});
})
.get('/', function(req, res, next) {
  res.json({ message: 'welcome to our api!' });
});

module.exports = router;