const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById(id);
};

const getByProps = async props => {
  return Board.find(props);
};

const create = async board => {
  return Board.create(board);
};

const update = async board => {
  return (
    await Board.updateOne(
      { _id: board.id },
      {
        ...board,
        columns: board.columns.map(curr => {
          return {
            _id: curr.id,
            title: curr.title,
            order: curr.order
          };
        })
      }
    )
  ).ok;
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, getById, getByProps, create, update, remove };
