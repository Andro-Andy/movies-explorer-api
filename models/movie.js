const mongoose = require('mongoose');
const { REGEX } = require('../utils/constants');

const { Schema } = mongoose;

const linkValidation = {
  validator: (v) => REGEX.test(v),
  message: 'Указана некорректная ссылка',
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: linkValidation,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: linkValidation,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: linkValidation,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('movie', movieSchema);
