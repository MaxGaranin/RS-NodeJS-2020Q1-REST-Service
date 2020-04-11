const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const User = require('./user.model');
const usersService = require('./user.service');
const { isValid } = require('./user.validator');
const { isUuid } = require('./../../common/utils');

router.route('/').get(
  ash(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(HttpStatus.OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    const user = await usersService.getById(id);
    if (!user) throwIsNotFound(id);

    res.status(HttpStatus.OK).json(User.toResponse(user));
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const userData = req.body;
    if (!isValid(userData)) throwDataIsNotValid();

    const user = await usersService.create(userData);
    res.status(HttpStatus.OK).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  ash(async (req, res) => {
    const userData = req.body;
    if (!isValid(userData)) throwDataIsNotValid();

    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    userData.id = id;
    const result = await usersService.update(userData);
    if (!result) throwIsNotFound(id);

    res.status(HttpStatus.OK).json(User.toResponse(userData));
  })
);

router.route('/:id').delete(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    const result = await usersService.remove(id);
    if (!result) throwIsNotFound(id);

    res.status(HttpStatus.NO_CONTENT).end();
  })
);

function throwIdIsNotValid(id) {
  throw createError(HttpStatus.BAD_REQUEST, `User id ${id} is not valid`);
}

function throwIsNotFound(id) {
  throw createError(HttpStatus.BAD_REQUEST, `User with id '${id}' not found`);
}

function throwDataIsNotValid() {
  throw createError(HttpStatus.BAD_REQUEST, 'User data is not valid');
}

module.exports = router;
