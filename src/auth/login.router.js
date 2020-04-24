const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const usersService = require('./../resources/users/user.service');
const { isValid } = require('./../resources/users/user.validator');
const { JWT_SECRET_KEY } = require('./../common/config');
const SALT_ROUNDS = 10;
const EXPIRES_SECONDS = 300;

router.route('/').get(
  ash(async (req, res) => {
    const userData = req.body;
    if (!isValid(userData)) {
      throw createError(HttpStatus.BAD_REQUEST, 'User data is not valid');
    }

    const hash = await bcrypt.hash(userData.password, SALT_ROUNDS);
    userData.passwordHash = hash;
    const user = usersService.create(userData);
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
