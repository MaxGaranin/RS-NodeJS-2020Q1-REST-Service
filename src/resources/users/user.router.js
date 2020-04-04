const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getById(id);
  if (user === undefined) {
    res.status(404).json({ message: `User with id ${id} is not found` });
  } else {
    res.json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  const user = req.body;
  const userWithId = await usersService.create(user);
  res.json(User.toResponse(userWithId));
});

router.route('/').put(async (req, res) => {
  const user = req.body;
  await usersService.update(user);
  res.status(200).send();
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await usersService.remove(id);
  res.status(200).send();
});

module.exports = router;
