function isValid(userData) {
  const { login, password } = userData;
  if (typeof login === 'string' && typeof password === 'string') {
    return true;
  }

  return false;
}

module.exports = {
  isValid
};
