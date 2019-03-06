const Joi = require('joi');
const mongoose = require('mongoose');

const Iteration = mongoose.model('Iteration', new mongoose.Schema({
	_parent: { type: String },
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	description:{
		type: String,
		required: false
	},
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cards' }],
	date: { type: Date, default: Date.now }
}));

function validateIteration(iteration) {
	const schema = { _parent: Joi.string(), title: Joi.string().min(3).required(), description: Joi.string().allow(''), cards: Joi.array().allow([]) };
	return Joi.validate(iteration, schema);
}

module.exports.Iteration = Iteration;
module. exports.validate = validateIteration;
