var express = require('express');
var router = express.Router();

var User = require('../models/user');

router
.get('/', function(req, res, next) {
	User.find(function(err, users) {
		if (err) res.send(err);
			res.json(users);
	});
})
.post('/',function(req,res,next){
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
	res.json({ message: 'User created!' });
	});
})
.get('/:user_id', function(req, res, next) {
	User.findById(req.params.user_id, function(err, user) {
		console.log(req.params);
		if (err) res.send(err);
		res.json(user);
	});
})
.put('/:user_id',function(req,res,next){
	User.findById(req.params.user_id, function(err, user) {
		if (err) res.send(err);

		if (req.body.name) user.name = req.body.name;
		if (req.body.username) user.username = req.body.username;
		if (req.body.password) user.password = req.body.password;
		if (req.body.latitude) user.latitude = req.body.latitude;
		if (req.body.longitude) user.longitude = req.body.longitude;

		user.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'User updated!' });
		});
	});
})
.delete('/:user_id',function(req,res,next){
	User.remove({_id: req.params.user_id}, function(err, user) {
		if (err) return res.send(err);
		res.json({ message: 'Successfully deleted User' });
	});
});

module.exports = router;