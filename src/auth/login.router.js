const router = require('express').Router();
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const bcrypt = require('bcrypt');
const usersService = require('./../resources/users/user.service');
const { JWT_SECRET_KEY } = require('./../common/config');
const EXPIRES_SECONDS = 300;

router.route('/').get(
  ash(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw createError(
        HttpStatus.BAD_REQUEST,
        'Login and password is not valid'
      );
    }

    const user = await usersService.getFirstByProps({ login });
    if (!user) {
      throw createError(HttpStatus.BAD_REQUEST, 'Login is not valid');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw createError(
        HttpStatus.BAD_REQUEST,
        'Login and password is not valid'
      );
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
    res.status(HttpStatus.OK).json(token);
    return;
  })
);

module.exports = router;
