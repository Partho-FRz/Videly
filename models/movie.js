const mongoose = require('mongoose');
const Joi = require("joi");
const {
    genreSchema
} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
        trim: true,
        lowercase: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;