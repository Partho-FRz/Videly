const {
  Rental,
  validate
} = require('../models/rental');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  Customer
} = require('../models/customer');
const {
  Movie
} = require('../models/movie');
const auth = require('../middleware/auth');
const Fawn = require('fawn');
Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("name");
  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("Cant find the Rental Please chceck again");
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid Customer');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Invalid Movie')

  let rental = new Rental({
    title: req.body.title,
    customer: {
      _id: customer._id,
      isGold: customer.isGold,
      number: customer.number
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {
        _id: movie._id
      }, {
        $inc: {
          numberInStock: -1
        }
      }).run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send('Something failed');
  }
});

module.exports = router;