var express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
mongoose = require('mongoose'),

Header = require('./app/middlewares/header'),
config = require('./config'),

indexRoute = require('./app/routes/index'),
usersRoute = require('./app/routes/users'),

app = express();

mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Header);

app.use('/users', usersRoute);
app.use('/', indexRoute);

app.listen(config.port);
console.log('Api live on '+config.port);