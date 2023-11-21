const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');
const { CODE_CREATED, CODE } = require('../utils/constants');

const checkUser = (user, res, next) => {
  if (user) {
    return res.send({ data: user });
  }
  const error = new NotFound('Пользователь по указанному _id не найден');
  return next(error);
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, updateData, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    checkUser(user, res, next);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name } = req.body;
  await updateUser(req, res, { name }, next);
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(CODE_CREATED).send({ data: user });
  } catch (error) {
    next(error);
  }
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
  res.status(CODE).send({ message: 'Вы успешно вышли.' });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  login,
  createUser,
  logout,
};
