const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies['jwt']

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET
    );
  } catch (err) {
    return next(new Unauthorized('Необходимо пройти авторизацию'));
  }
  req.user = payload;
  return next();
};
