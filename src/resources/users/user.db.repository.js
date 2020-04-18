const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const getByProps = async props => {
  return User.find(props);
};

const create = async user => {
  return User.create(user);
};

const update = async user => {
  return (await User.updateOne({ _id: user.id }, user)).ok;
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, getById, getByProps, create, update, remove };
