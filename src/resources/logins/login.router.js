const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const jwt = require('jsonwebtoken');
const loginService = require('./login.service');
const { JWT_SECRET_KEY } = require('../../common/config');
const EXPIRES_SECONDS = 30;

router.route('/').post(
  ash(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw createForbiddenError();
    }

    const user = await loginService.getUser(login, password);
    if (!user) {
      throw createForbiddenError();
    }

    const token = jwt.sign(
      {
        data: {
          userId: user.id,
          login: user.login
        }
      },
      JWT_SECRET_KEY,
      { expiresIn: EXPIRES_SECONDS }
    );

    res.status(HttpStatus.OK).json({ token });
  })
);

function createForbiddenError() {
  return createError(HttpStatus.FORBIDDEN, 'Login and password are not valid');
}

module.exports = router;
