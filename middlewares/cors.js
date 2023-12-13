const allowedCors = new Set([
  'https://movie-dox.nomoredomains.rocks',
  'http://movie-dox.nomoredomains.rocks',
  'https://api.movie-dox.nomoredomains.rocks/users/me',
  'https://api.movie-dox.nomoredomains.rocks/cards',
  'https://api.movie-dox.nomoredomains.rocks/signup',
  'https://api.movie-dox.nomoredomains.rocks/signin',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://51.250.104.105',
  'http://51.250.104.105',
]);

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
