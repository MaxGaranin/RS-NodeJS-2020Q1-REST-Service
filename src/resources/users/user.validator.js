const HttpStatus = require('http-status-codes');
const { isUuid } = require('./../../common/utils');

function isValid(userData) {
  const { name, login, password } = userData;
  if (
    typeof name === 'string' &&
    typeof login === 'string' &&
    typeof password === 'string'
  ) {
    return true;
  }

  return false;
}

function checkUserId(id, res) {
  if (!isUuid(id)) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `User id ${id} is not valid` });
    return false;
  }
  return true;
}

function checkUserData(userData, res) {
  if (!isValid(userData)) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'User data is not valid' });
    return false;
  }
  return true;
}

function userNotFound(id, res) {
  res
    .status(HttpStatus.BAD_REQUEST)
    .json({ message: `User with id ${id} is not found` });
}

module.exports = {
  checkUserId,
  checkUserData,
  userNotFound
};
