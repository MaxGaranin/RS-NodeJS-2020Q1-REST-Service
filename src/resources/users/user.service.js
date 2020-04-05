const usersRepo = require('./user.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const create = async user => await usersRepo.create(user);

const update = async user => await usersRepo.update(user);

const remove = async id => {
  usersRepo.remove(id);
  const tasks = await tasksRepo.getAllByUserId(id);
  tasks.forEach(async task => {
    task.userId = null;
    await tasksRepo.update(task);
  });
};

module.exports = { getAll, getById, create, update, remove };
