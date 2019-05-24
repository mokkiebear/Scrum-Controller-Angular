const router = require('express').Router();
require('mongoose');
const { Iteration } = require('../models/iteration');
const { Card, validate } = require('../models/card');


router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id });
    res.json(card);
  } catch (ex) {
    return res.status(404).send('The card with the given id was not found!');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    _parent: req.body._parent,
    title: req.body.title,
    description: req.body.description,
    storyPoint: req.body.storyPoint,
    state: req.body.state,
  });
  card = await card.save();

  // Занесение ObjectId карточки в итерацию
  try {
    const iteration = await Iteration.findOneAndUpdate({ _id: req.body._parent }, { $push: { cards: card._id } });
    // Установка ID проекта у итерации (Для того, чтобы карты BL не отображались во всех проектах)
    await Card.findOneAndUpdate({ _id: card._id }, { _projectId: iteration._parent });
    res.json(card);
  } catch (err) {
    return res.status(404).send('The project with the given ID was not found.');
  }
});


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // ID итерации карты, пусто, если у карты нет родителя
    const iterId = await Card.findOne({ _id: req.params.id }, { _parent: 1 });

    const card = await Card.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description, state: req.body.state, _parent: req.body._parent } }, { new: true });
    
    // Если необходимо убрать родителя у карты
    if (req.body._parent === '') {
      // Удаляем ID этой карты у родителя
      await Iteration.findOneAndUpdate({ _id: iterId._parent }, { $pull: { cards: card._id }});
    }
    else {
      // Если нужно установить родителя карты
      // Добавляем ID карты в итерацию
      await Iteration.findOneAndUpdate({ _id: req.body._parent }, { $addToSet: { cards: card._id }});
    }
    res.json(card);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const card = await Card.findOneAndDelete({ _id: req.params.id });
  if (card._parent !== '') await Iteration.findOneAndUpdate({ _id: card._parent }, { $pull: { cards: card._id } });
  res.json(card);
});

module.exports = router;
