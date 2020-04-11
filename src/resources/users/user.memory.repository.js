const User = require('./user.model');

const dbUsers = [];

const getAll = async () => {
  return dbUsers;
};

const getById = async id => {
  return dbUsers.find(dbUser => dbUser.id === id);
};

const create = async user => {
  const dbUser = new User(user);
  dbUsers.push(dbUser);
  return dbUser;
};

const update = async user => {
  const index = dbUsers.findIndex(dbUser => dbUser.id === user.id);
  if (index >= 0) {
    dbUsers[index] = user;
    return true;
  }
  return false;
};

const remove = async id => {
  const index = dbUsers.findIndex(dbUser => dbUser.id === id);
  if (index >= 0) {
    dbUsers.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, create, update, remove };
