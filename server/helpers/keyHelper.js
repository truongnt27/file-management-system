const { ROTATE_PERIOD } = require('./constant');
const convertDateToMilis = (str) => {
  const item = ROTATE_PERIOD.find(e => e.value === str);
  return item ? item.second : null;
}
module.exports = {
  convertDateToMilis
}