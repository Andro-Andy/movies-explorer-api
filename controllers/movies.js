const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFoundError');
const { CODE, MESSAGE_ERROR_AVTORISATION, MESSAGE_ERROR_INCORRECT_DATA, MESSAGE_ERROR_INCORRECT_ID, MESSAGE_DELETED_FILM, MESSAGE_ERROR_FILM_NOT_FOUND } = require('../utils/constants');

const getUserMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.json(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const ownerId = req.user._id;

    if (!ownerId) {
      throw new Forbidden(MESSAGE_ERROR_AVTORISATION);
    }

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: ownerId,
      movieId,
      nameRU,
      nameEN,
    });

    if (!movie) {
      throw new BadRequest(MESSAGE_ERROR_INCORRECT_DATA);
    }

    return res.send(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      throw new BadRequest(MESSAGE_ERROR_INCORRECT_ID);
    }

    const deletedMovie = await Movie.findOneAndDelete({ _id: movieId, owner: req.user._id });

    if (!deletedMovie) {
      throw new NotFound(MESSAGE_ERROR_FILM_NOT_FOUND);
    }

    return res.status(CODE).send({ message: MESSAGE_DELETED_FILM });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
