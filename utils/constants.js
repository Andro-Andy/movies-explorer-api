const CODE = 200;
const CODE_CREATED = 201;
const CODE_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;
const MESSAGE_ERROR_AVTORISATION = 'Необходима авторизация';
const MESSAGE_ERROR_INCORRECT_DATA = 'Переданы некорректные данные при создании фильма';
const MESSAGE_ERROR_INCORRECT_ID = 'Некорректный ID';
const MESSAGE_ERROR_FILM_NOT_FOUND = 'Фильм не найден';
const MESSAGE_DELETED_FILM = 'Фильм успешно удален';
const MESSAGE_SUCCESSFULL_SIGNIN = 'Вход выполнен успешно';
const MESSAGE_SUCCESSFULL_SIGNOUT = 'Вы успешно вышли';
const REGEX = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}([/a-zA-Z0-9_\-/]*)?$/;

module.exports = {
  CODE,
  CODE_CREATED,
  CODE_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  REGEX,
  MESSAGE_ERROR_AVTORISATION,
  MESSAGE_ERROR_INCORRECT_DATA,
  MESSAGE_ERROR_INCORRECT_ID,
  MESSAGE_DELETED_FILM,
  MESSAGE_ERROR_FILM_NOT_FOUND,
  MESSAGE_SUCCESSFULL_SIGNIN,
  MESSAGE_SUCCESSFULL_SIGNOUT,
};
