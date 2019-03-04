const mongoose = require('mongoose');
const {
  movieSchema
} = require('./movie');
const {
  customerSchema
} = require('./customer');
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    require: true
  },
  movie: {
    type: movieSchema,
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0
  }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
}

module.exports.validate = validateRental;
module.exports.Rental = Rental;