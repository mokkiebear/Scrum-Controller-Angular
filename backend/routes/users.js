const router = require('express').Router();
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');

router.get('/', async function (req, res) {
	const users = await User.find().sort('name');
	console.log(users);
	res.render('users', { "data": users });
});

router.post('/', async function (req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
	});

	user = await user.save();
	res.send('Добавлено: ' + JSON.stringify(user));
});

module.exports = router;
