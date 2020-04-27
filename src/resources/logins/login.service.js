const usersService = require('../users/user.service');
const bcrypt = require('bcrypt');

async function getUser(login, password) {
  const user = await usersService.getFirstByProps({ login });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return user;
}

module.exports = {
  getUser
};
