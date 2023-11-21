const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFoundError');
const { CODE } = require('../utils/constants');

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
      throw new Forbidden('Необходима авторизация');
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
      throw new BadRequest('Переданы некорректные данные при создании фильма');
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
      throw new BadRequest('Некорректный ID фильма');
    }

    const deletedMovie = await Movie.findOneAndDelete({ _id: movieId, owner: req.user._id });

    if (!deletedMovie) {
      throw new NotFound('Фильм не найден или не принадлежит текущему пользователю');
    }

    return res.status(CODE).send({ message: 'Фильм успешно удален' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
