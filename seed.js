var express = require('express'),
mongoose = require('mongoose'),
config = require('./config'),

User = require('./app/models/user'),

app = express();

mongoose.connect(config.db);

var seedUsers=[
  {
    "username": "bharat",
    "email": "bharatbgarg4@gmail.com",
    "name": "Bharat Garg",
    "password":"qwert",
    "dispatcher": true,
    "admin": true
  },
  {
    "username": "dispatcher",
    "email": "dispatcher@gmail.com",
    "name": "Dispatcher",
    "password":"qwert",
    "dispatcher": true,
  }
]

seedUsers.forEach(function(seeduser){
	var user = new User();
	user.name = seeduser.name;
	user.email = seeduser.email;
	user.username = seeduser.username;
	user.password = seeduser.password;
	if (seeduser.admin) user.admin = seeduser.admin;
	if (seeduser.dispatcher) user.dispatcher = seeduser.dispatcher;
	user.save(function(err) {
		if (err) {
			if (err.code == 11000)
			console.log('A user with that username or email already exists. ');
			else
			console.log(err);
		}
	});
console.log('User' +user.name+ ' Created');
});