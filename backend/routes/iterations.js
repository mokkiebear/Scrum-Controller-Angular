const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration, validate } = require('../models/iteration');
const { Project } = require('../models/project');

router.get('/:id', async function (req, res) {
  try {
    const iteration = await Iteration.findOne({ _id: req.params.id });
    res.json(iteration);
  } catch (err) {
    return res.status(404).send('The iteration with the given ID was not found.');
  }
});

router.post('/', async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let iteration = new Iteration({
    _parent: req.body._parent,
    title: req.body.title,
    description: req.body.description
  });
  iteration = await iteration.save();

  //Занесение ObjectId итерации в проект
  try {
    const project = await Project.findOneAndUpdate({ _id: req.body._parent }, { $push: {iterations: iteration._id} });
    res.json('Added!');
  } catch (err) {
    return res.status(404).send('The project with the given ID was not found.');
  }
});

router.delete('/:id', async function(req, res){
  let iteration = await Iteration.findOneAndDelete({ _id: req.params.id });
  let project = await Project.findOneAndUpdate({ _id: iteration._parent }, { $pull: { iterations: iteration._id } });
  res.json(iteration);
});

router.put('/:id', async function(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{
    const iteration = await Iteration.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } });
    res.json(iteration);
  }
  catch(err){
    res.status(404).send(err.message);
  }
});
module.exports = router;
