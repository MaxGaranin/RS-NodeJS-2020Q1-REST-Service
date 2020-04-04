const User = require('./user.model');

const dbUsers = [];

const getAll = async () => {
  return dbUsers;
};

const getById = async id => {
  return dbUsers.find(dbUser => {
    return dbUser.id === id;
  });
};

const create = async user => {
  const dbUser = new User(user);
  dbUsers.push(dbUser);
  return dbUser;
};

const update = async user => {
  const index = dbUsers.findIndex(dbUser => dbUser.id === user.id);
  dbUsers[index] = user;
};

const remove = async id => {
  const index = dbUsers.findIndex(dbUser => dbUser.id === id);
  dbUsers.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove };
