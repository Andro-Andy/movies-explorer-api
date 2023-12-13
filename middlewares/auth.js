const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходимо пройти авторизацию');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new Unauthorized('Необходимо пройти авторизацию');
  }
};
