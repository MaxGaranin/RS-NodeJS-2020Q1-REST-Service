function isValid(boardData) {
  const { title, columns } = boardData;
  if (typeof title === 'string' && Array.isArray(columns)) {
    return true;
  }

  return false;
}

module.exports = {
  isValid
};
