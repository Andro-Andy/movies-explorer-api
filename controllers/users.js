const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');
const { CODE_CREATED, CODE, MESSAGE_ERROR_INCORRECT_ID, MESSAGE_SUCCESSFULL_SIGNOUT } = require('../utils/constants');

const checkUser = (user, res, next) => {
  if (user) {
    return res.send({ data: user });
  }
  const error = new NotFound(MESSAGE_ERROR_INCORRECT_ID);
  return next(error);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, updateData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
    .then((user) => checkUser(user, res))
    .catch(next);
};

const updateProfile = async (req, res, next) => {
  const { name } = req.body;
  await updateUser(req, res, { name }, next);
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(CODE_CREATED)
      .send({ data: user }))

    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'none' });
      return res.status(CODE).send({ message: 'Вход выполнен успешно' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(CODE).send({ message: MESSAGE_SUCCESSFULL_SIGNOUT });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  login,
  createUser,
  logout,
};
