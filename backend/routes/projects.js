const auth = require('../middleware/auth');

const router = require('express').Router();
const mongoose = require('mongoose');
const { Project, validate } = require('../models/project');
const { User } = require('../models/user');
const { Card } = require('../models/card');
const { Iteration } = require('../models/iteration');

// Получение проектов пользователя
router.get('/', auth, async function (req, res) {
	const user = await User.findOne({ _id: req.user._id });
	const projects = await Project.find({ _id: { $in: user.projects } }).sort('title');
	res.json(projects);
});

// Создание проекта
router.post('/', auth, async function (req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let project = new Project({
		title: req.body.title,
		description: req.body.description,
		iterations: [] 
	});
	project = await project.save();
	// Добавление проекта пользователю
	await User.findOneAndUpdate({ _id: req.user._id }, { $push: { projects: project._id } });
	res.json(project);
});

router.get('/:id', async function (req, res) {
	const project = await Project.findOne({ _id: req.params.id });
	res.json(project);

	//return res.status(404).send('The project with the given ID was not found');
});

//Изменение проекта
router.put('/:id', auth, async function (req, res) {
	//Validate - If invalid, return 400 - Bad Request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//Look up the project - If not existing, return 404
	const project = await Project.findOneAndUpdate( { _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } }, { new: true });
	//Update the project - Return the updated project
	res.json(project);
	//return res.status(404).send('The project with the given ID was not found');	
});

// Удаление проекта
router.delete('/:id', auth, async function (req, res) {
	// Находим и удаляем проект
	const project = await Project.findOneAndDelete({ _id: req.params.id });
	//Удаление итераций объекта
	await Iteration.deleteMany({ _id: { $in: project.iterations } });
	// Удаление карточек проекта (в том числе BackLog)
	await Card.deleteMany({ _projectId: project._id });
	// Удаление этого проекта из проектов, доступных пользователям
	await User.updateMany({ projects: project._id }, { $pull: { projects: project._id } });
	res.json(project);
		//return res.status(404).send('The project with the given ID was not found');
});

//Получение итераций в рамках проекта
router.get('/:prId/iterations/', auth, async function(req, res){
	const project = await Project.findOne({ _id: req.params.prId });
	// Данные отсортированы по состоянию: completed -> doint -> new, и по дате завершения
	const iterations = await Iteration.find({ _id: { $in:  project.iterations } }).sort({ state: 1, finishDate: 1 });
	res.json(iterations);
		//return res.status(404).send('The project with the given ID was not found' + err.message);
	
});

module.exports = router;
