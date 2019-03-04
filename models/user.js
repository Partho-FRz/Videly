const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function () {
  return (jwt.sign({
    id: this.id,
    isAdmin: this.isAdmin
  }, config.get('jwtPrivateKey')));
}

const User = mongoose.model('User', userSchema);

function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validate;