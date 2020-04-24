const usersRepo = require('./user.db.repository');
const tasksRepo = require('./../tasks/task.db.repository');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const create = async user => {
  if (!user.name) user.name = user.login;
  await usersRepo.create(user);
};

const update = async user => await usersRepo.update(user);

const remove = async id => {
  const result = usersRepo.remove(id);

  const tasks = await tasksRepo.getAllByUserId(id);
  tasks.forEach(async task => {
    task.userId = null;
    await tasksRepo.update(task);
  });

  return result;
};

module.exports = { getAll, getById, create, update, remove };
