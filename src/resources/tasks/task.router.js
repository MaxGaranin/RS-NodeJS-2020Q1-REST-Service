const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const boardId = req.query.boardId;
  const tasks = await tasksService.getAllByBoardId(boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const task = await tasksService.getById(id);
  if (task === undefined) {
    res.status(404).json({ message: `Task with id ${id} is not found` });
  } else {
    res.json(task);
  }
});

router.route('/').post(async (req, res) => {
  const task = req.body;
  const taskWithId = await tasksService.create(task);
  res.json(taskWithId);
});

router.route('/').put(async (req, res) => {
  const task = req.body;
  await tasksService.update(task);
  res.status(200).send();
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await tasksService.remove(id);
  res.status(200).send();
});

module.exports = router;
