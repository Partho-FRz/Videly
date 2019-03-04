const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();
const app = express();
const {
  Genre,
  validate
} = require('../models/genre');

router.get('/', async (req, res) => {
  await Genre.find()
    .sort('name')
    .then(genres => {
      res.send(genres);
    })
    .catch(err => {
      res.send('Something went wrong');
    });
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send('Cant find the Genre Please chceck again');
    res.send(genre);
  } catch (err) {
    res.send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  console.log(genre);
  if (!genre)
    return res.status(404).send('Cant find the Genre Please chceck again');
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name;
  genre = await genre.save();
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send('Cant find the genre please check again');
  res.send(genre);
});
module.exports = router;