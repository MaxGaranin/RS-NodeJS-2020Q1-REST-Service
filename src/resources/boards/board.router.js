const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.getById(id);
  if (board === undefined) {
    res.status(404).json({ message: `Board with id ${id} is not found` });
  } else {
    res.json(board);
  }
});

router.route('/').post(async (req, res) => {
  const board = req.body;
  const boardWithId = await boardsService.create(board);
  res.json(boardWithId);
});

router.route('/').put(async (req, res) => {
  const board = req.body;
  await boardsService.update(board);
  res.status(200).send();
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await boardsService.remove(id);
  res.status(200).send();
});

module.exports = router;
