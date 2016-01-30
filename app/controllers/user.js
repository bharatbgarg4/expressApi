var User = require('../models/user'),

controller = {
	all:function(req, res) {
		User.find(function(err, users) {
			if (err) res.send(err);
				res.json(users);
		});
	},
	get:function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			console.log(req.params);
			if (err) res.send(err);
			res.json(user);
		});
	},
	save : function(req,res){
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
	},
	update:function(req,res){
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			if (req.body.latitude) user.latitude = req.body.latitude;
			if (req.body.longitude) user.longitude = req.body.longitude;
			if (req.body.admin) user.admin = req.body.admin;
			if (req.body.dispatcher) user.dispatcher = req.body.dispatcher;
			user.updated=Date.now;

			user.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'User updated!' });
			});
		});
	},
	delete : function(req,res){
		User.remove({_id: req.params.user_id}, function(err, user) {
			if (err) return res.send(err);
			res.json({ message: 'Successfully deleted User' });
		});
	}

}

module.exports = controller;