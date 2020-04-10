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

module.exports = {
  isValid
};
