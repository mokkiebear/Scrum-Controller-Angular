const Joi = require('joi');
const mongoose = require('mongoose');

const Iteration = mongoose.model('Iteration', new mongoose.Schema({
	_id:{
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	description:{
		type: String,
		required: false
	},
	cards: [{ type: Object, required: false }],
	date: { type: Date, default: Date.now }
}));

module.exports.Iteration = Iteration;