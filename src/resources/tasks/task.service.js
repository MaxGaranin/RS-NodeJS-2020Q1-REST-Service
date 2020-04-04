const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = () => tasksRepo.getAllByBoardId();

const getById = id => tasksRepo.getById(id);

const create = board => tasksRepo.create(board);

const update = board => tasksRepo.update(board);

const remove = id => tasksRepo.remove(id);

module.exports = { getAllByBoardId, getById, create, update, remove };
