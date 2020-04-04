const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const remove = id => {
  boardsRepo.remove(id);
  const tasks = tasksRepo.getAllByBoardId(id);
  tasks.forEach(task => tasksRepo.remove(task.id));
};

module.exports = { getAll, getById, create, update, remove };
