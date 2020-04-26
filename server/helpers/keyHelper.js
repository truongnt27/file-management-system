const { ROTATE_PERIOD } = require('./constant');
const convertDateToMilis = (str) => {
  const second = ROTATE_PERIOD.find(e => e.value === str);
  return second;
}
module.exports = {
  convertDateToMilis
}