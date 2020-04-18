const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    boardId: String, // TODO: required
    userId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, boardId, userId, columnId } = task;
  return { id, title, order, description, boardId, userId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
