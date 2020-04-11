const Board = require('./board.model');

const dbBoards = [];

const getAll = async () => {
  return dbBoards;
};

const getById = async id => {
  return dbBoards.find(dbUser => dbUser.id === id);
};

const create = async board => {
  const dbBoard = new Board(board);
  dbBoards.push(dbBoard);
  return dbBoard;
};

const update = async board => {
  const index = dbBoards.findIndex(dbBoard => dbBoard.id === board.id);
  if (index >= 0) {
    dbBoards[index] = board;
    return true;
  }
  return false;
};

const remove = async id => {
  const index = dbBoards.findIndex(dbBoard => dbBoard.id === id);
  if (index >= 0) {
    dbBoards.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, create, update, remove };
