var mongoose = require('mongoose'),
validator = require('validator'),
bcrypt = require('bcrypt-nodejs'),
Schema = mongoose.Schema,

UserSchema = new Schema({
	name: String,
	email: { type: String, required: true,  validate: [ validator.isEmail, 'Email is not valid' ], index: { unique: true }},
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	latitude: String,
	longitude: String,
	admin: { type: Boolean, default: false },
	dispatcher: { type: Boolean, default: false },
	updated: { type: Date, default: Date.now },
	created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
		bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);