const tasksRepo = require('./task.db.repository');

const getAllByBoardId = async boardId =>
  await tasksRepo.getAllByBoardId(boardId);

const getById = async (id, boardId) => await tasksRepo.getById(id, boardId);

const create = async task => await tasksRepo.create(task);

const update = async task => await tasksRepo.update(task);

const remove = async (id, boardId) => await tasksRepo.remove(id, boardId);

module.exports = { getAllByBoardId, getById, create, update, remove };
