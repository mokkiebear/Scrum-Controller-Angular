const Joi = require('joi');
const mongoose = require('mongoose');

const Iteration = mongoose.model('Iteration', new mongoose.Schema({
	_parent: { type: String }, // id проекта
	title: { // Название итерации
		type: String,
		required: true,
		maxlength: 50
	},
	description: { // Описание итерации
		type: String,
		required: false
	},
	goal: { type: String }, // Цель итерации
	summary: { type: String }, // Итоги итерации
	state: { type: String, enum: ['new', 'doing', 'competed'] }, // Состояние итерации (новая, в процессе, завершенная)
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cards' }], // карточки итерации (кроме BackLog)
	startDate: { type: Date }, // Дата начала итерации
	finishDate: { type: Date }, // Дата завершения итерации
	date: { type: Date, default: Date.now } // Дата создания итерации, заполняется автоматически
}));

function validateIteration(iteration) {
	const schema = {
		_parent: Joi.string(),
		title: Joi.string().min(3).required(),
		description: Joi.string().allow(''),
		goal: Joi.string().required(),
		state: Joi.string(),
		cards: Joi.array().allow([]),
		finishDate: Joi.date()
	};
	return Joi.validate(iteration, schema);
}

module.exports.Iteration = Iteration;
module. exports.validate = validateIteration;
