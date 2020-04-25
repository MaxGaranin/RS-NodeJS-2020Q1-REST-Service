const usersRepo = require('./user.db.repository');
const tasksRepo = require('./../tasks/task.db.repository');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const getByProps = async props => await usersRepo.getByProps(props);

const getFirstByProps = async props => {
  const users = await getByProps(props);
  if (users.length === 0) return null;
  return users[0];
};

const create = async user => await usersRepo.create(user);

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

module.exports = {
  getAll,
  getById,
  getByProps,
  getFirstByProps,
  create,
  update,
  remove
};
