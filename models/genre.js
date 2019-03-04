const Joi = require("joi");
const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        // enum: [
        //     "action",
        //     "adventure",
        //     "comedy",
        //     "crime",
        //     "horror",
        //     "thriller",
        //     "drama",
        //     "war",
        //     "racing"
        // ]
    }
});

const Genre = mongoose.model("Genre", genreSchema);

function validate(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validate;