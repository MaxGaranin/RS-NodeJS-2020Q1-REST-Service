const uuid = require('uuid');
const mongoose = require('mongoose');
const { Column, columnSchema } = require('../columns/column.model');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  const cols = columns.map(column => Column.toResponse(column));
  return { id, title, columns: cols };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
