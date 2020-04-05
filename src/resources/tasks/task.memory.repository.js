const Task = require('./task.model');

const dbTasks = [];

const getAllByBoardId = async boardId => {
  return dbTasks.filter(dbTask => dbTask.boardId === boardId);
};

const getAllByUserId = async userId => {
  return dbTasks.filter(dbTask => dbTask.userId === userId);
};

const getById = async (id, boardId) => {
  return dbTasks.find(dbTask => dbTask.id === id && dbTask.boardId === boardId);
};

const create = async task => {
  const dbTask = new Task(task);
  dbTasks.push(dbTask);
  return dbTask;
};

const update = async task => {
  const index = dbTasks.findIndex(dbTask => dbTask.id === task.id);
  dbTasks[index] = task;
};

const remove = async (id, boardId) => {
  const index = dbTasks.findIndex(
    dbTask => dbTask.id === id && dbTask.boardId === boardId
  );
  dbTasks.splice(index, 1);
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  create,
  update,
  remove
};
