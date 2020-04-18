const boardsRepo = require('./board.db.repository');
const tasksRepo = require('./../tasks/task.db.repository');

const getAll = async () => await boardsRepo.getAll();

const getById = async id => await boardsRepo.getById(id);

const create = async board => await boardsRepo.create(board);

const update = async board => await boardsRepo.update(board);

const remove = async id => {
  const result = await boardsRepo.remove(id);
  const tasks = await tasksRepo.getAllByBoardId(id);
  tasks.forEach(async task => await tasksRepo.remove(task.id, id));
  return result;
};

module.exports = { getAll, getById, create, update, remove };
