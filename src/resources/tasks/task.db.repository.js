const Task = require('./task.model');

const getAllByBoardId = async boardId => {
  return Task.find({ boardId });
};

const getAllByUserId = async userId => {
  return Task.find({ userId });
};

const getById = async (id, boardId) => {
  const task = await Task.findOne({ _id: id, boardId });
  return task;
};

const create = async task => {
  return Task.create(task);
};

const update = async task => {
  return (await Task.updateOne({ _id: task.id }, task)).ok;
};

const remove = async (id, boardId) => {
  return (await Task.deleteOne({ _id: id, boardId })).ok;
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  create,
  update,
  remove
};
