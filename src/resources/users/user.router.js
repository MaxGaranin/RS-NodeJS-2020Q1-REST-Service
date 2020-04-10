const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const User = require('./user.model');
const usersService = require('./user.service');
const { isValid } = require('./user.validator');
const { isUuid } = require('./../../common/utils');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(HttpStatus.OK).json(users.map(User.toResponse));
});

router.route('/:id').get(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) {
      throw createError(HttpStatus.BAD_REQUEST, `User id ${id} is not valid`);
    }

    const user = await usersService.getById(id);

    if (!user) {
      throw createError(HttpStatus.BAD_REQUEST, `User id '${id}' not found`);
    }

    res.status(HttpStatus.OK).json(User.toResponse(user));
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const userData = req.body;
    if (!isValid(userData)) {
      throw createError(HttpStatus.BAD_REQUEST, 'User data is not valid');
    }

    const user = await usersService.create(userData);
    res.status(HttpStatus.OK).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  ash(async (req, res) => {
    const userData = req.body;
    if (!isValid(userData)) {
      throw createError(HttpStatus.BAD_REQUEST, 'User data is not valid');
    }

    const id = req.params.id;
    if (!isUuid(id)) {
      throw createError(HttpStatus.BAD_REQUEST, `User id ${id} is not valid`);
    }

    userData.id = id;
    const result = await usersService.update(userData);

    if (!result) {
      throw createError(HttpStatus.BAD_REQUEST, `User id '${id}' not found`);
    }

    res.status(HttpStatus.OK).json(User.toResponse(userData));
  })
);

router.route('/:id').delete(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) {
      throw createError(HttpStatus.BAD_REQUEST, `User id ${id} is not valid`);
    }

    const result = await usersService.remove(id);

    if (!result) {
      throw createError(HttpStatus.BAD_REQUEST, `User id '${id}' not found`);
    }

    res.status(HttpStatus.NO_CONTENT).end();
  })
);

module.exports = router;
