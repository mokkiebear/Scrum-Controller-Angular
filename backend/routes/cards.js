const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration } = require('../models/iteration');
const { Card, validate } = require('../models/card');

//Удаление итерации
/*router.delete('/:id', async function(req, res){
    const card = await Card.
});
*/

router.get('/:id', async function(req, res){
  try{
    const card = await Card.findOne({ _id: req.params.id });
    res.json(card);
  }
  catch(err){
    return res.status(404).send('The card with the given id was not found!');
  }
  
});

router.post('/', async function(req, res){
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    _parent: req.body._parent,
    title: req.body.title,
    description: req.body.description,
    state: req.body.state
  });
  card = await card.save();

  //Занесение ObjectId карточки в итерацию
  try {
    const iteration = await Iteration.findOneAndUpdate({ _id: req.body._parent }, { $push: {cards: card._id} });
    res.json('Added!');
  } catch (err) {
    return res.status(404).send('The project with the given ID was not found.');
  }
});


router.put('/:id', async function(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{
    const card = await Card.findByIdAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description, state: req.body.state } }, { new: true });
    res.json(card);
  } catch(err){
    return res.status(404).send(err.message);
  }
});

module.exports = router;