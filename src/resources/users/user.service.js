const usersRepo = require('./user.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = id => {
  usersRepo.remove(id);
  const tasks = tasksRepo.getAllByUserId(id);
  tasks.forEach(task => {
    task.userId = null;
    tasksRepo.update(task);
  });
};

module.exports = { getAll, getById, create, update, remove };
