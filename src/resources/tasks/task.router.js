const router = require('express').Router({ mergeParams: true });
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const tasksService = require('./task.service');
const { isValid } = require('./task.validator');
const { isUuid } = require('./../../common/utils');

router.route('/').get(
  ash(async (req, res) => {
    const boardId = req.params.boardId;
    if (!isUuid(boardId)) throwBoardIdIsNotValid(boardId);

    const tasks = await tasksService.getAllByBoardId(boardId);
    res.status(HttpStatus.OK).json(tasks);
  })
);

router.route('/:id').get(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);
    const boardId = req.params.boardId;
    if (!isUuid(boardId)) throwBoardIdIsNotValid(boardId);

    const task = await tasksService.getById(id, boardId);
    if (!task) throwIsNotFound(id, boardId);

    res.status(HttpStatus.OK).json(task);
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const taskData = req.body;
    if (!isValid(taskData)) throwDataIsNotValid();

    const boardId = req.params.boardId;
    if (!isUuid(boardId)) throwBoardIdIsNotValid(boardId);

    taskData.boardId = boardId;
    const task = await tasksService.create(taskData);
    res.status(HttpStatus.OK).json(task);
  })
);

router.route('/:id').put(
  ash(async (req, res) => {
    const taskData = req.body;
    if (!isValid(taskData)) throwDataIsNotValid();

    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);
    const boardId = req.params.boardId;
    if (!isUuid(boardId)) throwBoardIdIsNotValid(boardId);

    taskData.id = id;
    taskData.boardId = boardId;
    const result = await tasksService.update(taskData);
    if (!result) throwIsNotFound(id, boardId);

    res.status(HttpStatus.OK).json(taskData);
  })
);

router.route('/:id').delete(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);
    const boardId = req.params.boardId;
    if (!isUuid(boardId)) throwBoardIdIsNotValid(boardId);

    const result = await tasksService.remove(id, boardId);
    if (!result) throwIsNotFound(id, boardId);

    res.status(HttpStatus.NO_CONTENT).end();
  })
);

function throwIdIsNotValid(id) {
  throw createError(HttpStatus.BAD_REQUEST, `Task id ${id} is not valid`);
}

function throwBoardIdIsNotValid(boardId) {
  throw createError(HttpStatus.BAD_REQUEST, `Board id ${boardId} is not valid`);
}

function throwIsNotFound(id, boardId) {
  throw createError(
    HttpStatus.NOT_FOUND,
    `Task with id ${id} and boardId ${boardId} is not found`
  );
}

function throwDataIsNotValid() {
  throw createError(HttpStatus.BAD_REQUEST, 'Task data is not valid');
}

module.exports = router;
