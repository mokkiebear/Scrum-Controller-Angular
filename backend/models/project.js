const Joi = require('joi');
const mongoose = require('mongoose');

const Project = mongoose.model('Project', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	date: { type: Date, default: Date.now },
	itterations: [Object]
}));

function validateProject(project) {
	const schema = { title: Joi.string().min(3).required() };
	return Joi.validate(project, schema);
}

module.exports.Project = Project;
module. exports.validate = validateProject;