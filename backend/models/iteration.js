const Joi = require('joi');
const mongoose = require('mongoose');

const Iteration = mongoose.model('Iteration', new mongoose.Schema({
    title: {
		type: String,
		required: true,
		maxlength: 50
	}
}));

module.exports.Iteration = Iteration;