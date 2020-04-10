const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const {
  checkUserId,
  checkUserData,
  userNotFound
} = require('./user.validator');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(HttpStatus.OK).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  if (!checkUserId(id, res)) return;

  const user = await usersService.getById(id);
  if (!user) {
    userNotFound(id, res);
    return;
  }

  res.status(HttpStatus.OK).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  if (!checkUserData(userData, res)) return;

  const user = await usersService.create(userData);
  res.status(HttpStatus.OK).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const userData = req.body;
  if (!checkUserData(userData, res)) return;

  const id = req.params.id;
  if (!checkUserId(id, res)) return;
  userData.id = id;

  const result = await usersService.update(userData);
  if (!result) {
    userNotFound(id, res);
    return;
  }

  res.status(HttpStatus.OK).json(User.toResponse(userData));
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  if (!checkUserId(id, res)) return;

  const result = await usersService.remove(id);
  if (!result) {
    userNotFound(id, res);
    return;
  }

  res.status(HttpStatus.NO_CONTENT).end();
});

module.exports = router;
