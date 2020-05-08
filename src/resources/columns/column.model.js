const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Column'
    },
    order: {
      type: Number,
      default: 0
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = {
  Column,
  columnSchema
};
