const Joi = require('joi');
const mongoose = require('mongoose'); 

const Card = mongoose.model('Card', new mongoose.Schema({
	_parent: { type: String },
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	description: {type: String, required: false},
	state: {
		type: String, 
		enum: ['todo', 'doing', 'done','BackLog']
	},
	storyPoint: { type: Number, required: true, min: 1, max: 20 },
	date: { type: Date, default: Date.now }
}));

function validateCard(card) {
	const schema = { 
		_parent: Joi.string(), 
		title: Joi.string().min(3).required(), 
		description: Joi.string().allow(''), 
		storyPoint: Joi.number().min(1).max(20) , 
		state: Joi.string() 
	};
	return Joi.validate(card, schema);
}

module.exports.Card = Card;
module. exports.validate = validateCard;