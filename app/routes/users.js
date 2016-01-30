var express = require('express'),

UserController = require('../controllers/user'),

router = express.Router();

router
.get('/', UserController.all)
.post('/',UserController.save)
.get('/:user_id', UserController.get)
.put('/:user_id',UserController.update)
.delete('/:user_id',UserController.delete);

module.exports = router;