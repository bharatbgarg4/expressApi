var jwt = require('jsonwebtoken'),
config = require('../../config'),

User = require('../models/user'),

middleware = function(req , res, next){
	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err){
				req.user=0;
				next();
			}
			else{
				User.findById(decoded.id, function(err, user) {
					if (err){
						req.user=0;
						next();
					}
					else{
						req.user=user;
						next();
					}
				});
			}
		});
	}
	else{
		req.user=0;
		next();
	}
};

module.exports = middleware;