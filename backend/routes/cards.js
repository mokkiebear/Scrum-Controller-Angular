const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration } = require('../models/iteration');
const { Card, validate } = require('../models/card');

//Удаление итерации
/*router.delete('/:id', async function(req, res){
    const card = await Card.
});
*/

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

//Получение итерации по ID
/*router.get('/:prId/iteration/:itId', async function(req, res){
    try{
        const project = await Project.findOne({ _id: req.params.prId });
        const iteration = project.iterations.find(x => x._id == req.params.itId);
        res.json(iteration);
    }
    catch{
        return res.status(404).send('The iteration with the given ID was not found');
    }
    
});*/

module.exports = router;