const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ash = require('express-async-handler');
const boardsService = require('./board.service');
const { isValid } = require('./board.validator');
const { isUuid } = require('./../../common/utils');

router.route('/').get(
  ash(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(HttpStatus.OK).json(boards);
  })
);

router.route('/:id').get(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    const board = await boardsService.getById(id);
    if (!board) throwIsNotFound(id);

    res.status(HttpStatus.OK).json(board);
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const boardData = req.body;
    if (!isValid(boardData)) throwDataIsNotValid();

    const board = await boardsService.create(boardData);
    res.status(HttpStatus.OK).json(board);
  })
);

router.route('/:id').put(
  ash(async (req, res) => {
    const boardData = req.body;
    if (!isValid(boardData)) throwDataIsNotValid();

    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    boardData.id = id;
    const result = await boardsService.update(boardData);
    if (!result) throwIsNotFound(id);

    res.status(HttpStatus.OK).json(boardData);
  })
);

router.route('/:id').delete(
  ash(async (req, res) => {
    const id = req.params.id;
    if (!isUuid(id)) throwIdIsNotValid(id);

    const result = await boardsService.remove(id);
    if (!result) throwIsNotFound(id);

    res.status(HttpStatus.NO_CONTENT).end();
  })
);

function throwIdIsNotValid(id) {
  throw createError(HttpStatus.BAD_REQUEST, `Board id ${id} is not valid`);
}

function throwIsNotFound(id) {
  throw createError(HttpStatus.BAD_REQUEST, `Board with id '${id}' not found`);
}

function throwDataIsNotValid() {
  throw createError(HttpStatus.BAD_REQUEST, 'Board data is not valid');
}

module.exports = router;
