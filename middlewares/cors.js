const allowedCors = [
  'http://movie-dox.nomoredomainsmonster.ru',
  'http://movie-dox.nomoredomainsmonster.ru',
  'http://api.movie-dox.nomoredomainsmonster.ru/users/me',
  'http://api.movie-dox.nomoredomainsmonster.ru/cards',
  'http://api.movie-dox.nomoredomainsmonster.ru/signup',
  'http://api.movie-dox.nomoredomainsmonster.ru/signin',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'http://51.250.104.105',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
