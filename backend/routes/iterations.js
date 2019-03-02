const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration } = require('../models/iteration');

router.post('/', async function(req, res) {
    let iteration = new Iteration({
        title: req.body.title,
        description: req.body.description
    });
});