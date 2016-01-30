var express = require('express'),
jwt = require('jsonwebtoken'),

User = require('../models/user'),
UserController = require('../controllers/user'),
config = require('../../config'),

router = express.Router();

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
		var token = jwt.sign({id:user._id},
			config.secret, {
			expiresIn: 172800 // expires in 2 Days
		});
		res.json({
			success: true,
			message: 'Auth Token',
			token: token
		});
	});
})
.post('/register',UserController.save)
.get('/', function(req, res, next) {
  res.json({ message: 'welcome to our api!' });
});

module.exports = router;