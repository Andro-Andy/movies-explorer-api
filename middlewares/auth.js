const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET
    );
    req.user = payload;
    return next();
  } catch (err) {
    return next(new Unauthorized('Необходимо пройти авторизацию'));
  }
};
