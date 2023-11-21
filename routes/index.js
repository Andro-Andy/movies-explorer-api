const router = require('express').Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const signoutRouter = require('./signout');

router.use('/', signinRouter);
router.use('/', signupRouter);

router.use(auth);

router.use('/', signoutRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

module.exports = router;
