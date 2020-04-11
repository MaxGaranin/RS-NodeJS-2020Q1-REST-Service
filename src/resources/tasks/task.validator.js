function isValid(taskData) {
  const { title, order, description } = taskData;
  if (
    typeof title === 'string' &&
    typeof order === 'number' &&
    typeof description === 'string'
  ) {
    return true;
  }

  return false;
}

module.exports = {
  isValid
};
