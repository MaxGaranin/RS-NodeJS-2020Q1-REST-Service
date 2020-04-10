/**
 * Check string is Uuid
 * Sources from https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
 * @param {*} str
 */
function isUuid(str) {
  const regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regexp.test(str);
}

module.exports = {
  isUuid
};
