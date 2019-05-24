const router = require('express').Router();
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Joi = require('joi');
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');


// Получения пользователя по email
router.get('/:email', async function(req, res) {
	const user = await User.findOne({ email: req.params.email });
	res.json(_.pick(user, ['_id', 'name', 'email']));
});

// Добавление проекта пользователю
router.put('/', async function(req, res) {
	const projectId = req.body.projectId;
	const userId = req.body.userId;
	console.log(projectId);
	console.log(userId);
	const user = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { projects: projectId } }, {new: true});
	res.json(user);
});

// Создание новых пользователей
router.post('/', async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered!');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res.header('Authorization', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
