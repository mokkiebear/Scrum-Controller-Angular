const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration, validate } = require('../models/iteration');
const { Project } = require('../models/project');
const { Card } = require('../models/card');

// Получение итерации
router.get('/:id', async (req, res) => {
  try {
    const iteration = await Iteration.findOne({ _id: req.params.id });
    res.json(iteration);
  } catch (err) {
    return res.status(404).send('The iteration with the given ID was not found.');
  }
});

// Создание итерации
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let iteration = new Iteration({
    _parent: req.body._parent,
    title: req.body.title,
    description: req.body.description,
    goal: req.body.goal,
    state: 'new',
    finishDate: req.body.finishDate
  });
  iteration = await iteration.save();

  // Занесение ObjectId итерации в проект
  try {
    await Project.findOneAndUpdate({ _id: req.body._parent }, { $push: {iterations: iteration._id} });
    res.json(iteration);
  } catch (err) {
    return res.status(404).send('The project with the given ID was not found.');
  }
});

// Удаление итерации; Удаление карт итерации; Удаление итерации из проекта
router.delete('/:id', async function(req, res){
  let iteration = await Iteration.findOneAndDelete({ _id: req.params.id });
  await Card.deleteMany({ _id: { $in: iteration.cards } });
  await Project.findOneAndUpdate({ _id: iteration._parent }, { $pull: { iterations: iteration._id } });
  res.json(iteration);
});

router.put('/:id', async function(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{
    let iteration = await Iteration.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description, goal: req.body.goal, state: req.body.state, finishDate: req.body.finishDate } }, { new: true });
    // Устанавливаем дату начала выполнения итерации
    if (req.body.state === 'doing' && iteration.startDate === undefined){
      iteration = await Iteration.findOneAndUpdate({ _id: req.params.id }, { $set: { startDate: Date.now() } }, { new: true });
    }
    res.json(iteration);
  }
  catch(err){
    res.status(404).send(err.message);
  }
});

// Добавление итогов итерации
router.put('/summary/:id', async function(req, res) {
  const summary = req.body.summary;
  const iteration = await Iteration.findOneAndUpdate({ _id: req.params.id }, { summary: summary }, { new: true });
  res.json(iteration);
});

// Получение карт итерации
router.get('/:itId/cards', async function(req, res){
  try{
    const iteration = await Iteration.findOne({ _id: req.params.itId });
    // Карточки итерации, либо карточки БЛ в рамках проекта
    const cards = await Card.find({ $and: [ { $or: [{ _id: { $in: iteration.cards } }, {_parent: ''}] } , { _projectId: iteration._parent }] });
    res.json(cards);
  }
  catch(err){
    return res.status(404).send(err.message);
  }
});
module.exports = router;
