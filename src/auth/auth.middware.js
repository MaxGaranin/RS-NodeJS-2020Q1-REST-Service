const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

function authenticate(req, res, next) {
  if (
    req.originalUrl === '/' ||
    req.originalUrl.startsWith('/login') ||
    req.originalUrl.startsWith('/doc') ||
    req.originalUrl.startsWith('/favicon.ico')
  ) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const err = createError(HttpStatus.UNAUTHORIZED, 'Failed to authenticate');
    return next(err);
  }

  const token = authHeader.split(' ')[1].trim();
  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      const error = createError(
        HttpStatus.UNAUTHORIZED,
        'Failed to authenticate token'
      );
      return next(error);
    }

    next();
  });
}

module.exports = { authenticate };
