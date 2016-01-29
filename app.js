var express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
mongoose = require('mongoose'),

port=process.env.PORT || 8080,


indexRoute = require('./app/routes/index'),
usersRoute = require('./app/routes/users'),

app = express();

mongoose.connect('mongodb://localhost/expressApi');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

app.use('/users', usersRoute);
app.use('/', indexRoute);

app.listen(port);
console.log('Api live on '+port);