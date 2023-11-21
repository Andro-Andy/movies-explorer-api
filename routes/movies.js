const movieRouter = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/movieValidator');

movieRouter.get('/', getUserMovies);

movieRouter.post('/', validateMovie, createMovie);

movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
