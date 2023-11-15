const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  CODE_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
} = require('./constants');
const Unauthorized = require('../errors/Unauthorized');
const NotFound = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(CODE_ERROR)
      .send({ message: `Переданы некорректные данные ${CODE_ERROR}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(NOT_FOUND_ERROR)
      .send({
        message: `Запрашиваемый ресурс не найден ${NOT_FOUND_ERROR}`,
      });
  }

  if (err instanceof NotFound || err instanceof Unauthorized || err instanceof Forbidden) {
    const { message } = err;
    return res
      .status(err.type)
      .send({ message });
  }

  if (err.code === 11000) {
    return res
      .status(CONFLICT_ERROR)
      .send({ message: 'Адрес электронной почты уже зарегистрирован' });
  }

  res
    .status(SERVER_ERROR)
    .send({
      message: 'На сервере произошла ошибка',
    });

  return next();
};
