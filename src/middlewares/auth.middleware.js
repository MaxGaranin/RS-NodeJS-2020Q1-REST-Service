const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

function authenticate(req, res, next) {
  if (dontNeedToAuthenticate(req.originalUrl)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = createUnauthorizedError();
    return next(error);
  }

  const token = authHeader.split(' ')[1].trim();
  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      const error = createUnauthorizedError();
      return next(error);
    }
    next();
  });
}

function dontNeedToAuthenticate(url) {
  if (
    url === '/' ||
    url.startsWith('/login') ||
    url.startsWith('/doc') ||
    url.startsWith('/favicon.ico')
  ) {
    return true;
  }
  return false;
}

function createUnauthorizedError() {
  return createError(HttpStatus.UNAUTHORIZED, 'Failed to authenticate');
}

module.exports = authenticate;
