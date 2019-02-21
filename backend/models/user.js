const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50
	},
  isGold: { type: Boolean, default: false },
  phone: {
		type: String,
		required: true,
		maxlength: 50
	}
}));

function validateUser(user) {
	const schema = { 
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean()
  };
	return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;