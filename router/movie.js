const {
  Movie,
  validate
} = require('../models/movie');
const {
  Genre
} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("Cant find the Movie Please chceck again");
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("Cant find the Movie Please chceck again");
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  if (req.body.genreId) {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');
    movie.genre = {
      _id: genre._id,
      name: genre.name
    }
  }

  movie.title = req.body.title;
  movie.numberInStock = req.body.numberInStock;
  movie.dailyRentalRate = req.body.dailyRentalRate;
  movie = await movie.save();
  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("Cant find the Movie please check again");
  res.send(movie);
});
module.exports = router;