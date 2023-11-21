const usersRouter = require('express').Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/userValidator');

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRouter;
