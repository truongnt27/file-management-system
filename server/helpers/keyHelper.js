const crypto = require('crypto');

const { ROTATE_PERIOD } = require('./constant');
const convertDateToMilis = (str) => {
  const item = ROTATE_PERIOD.find(e => e.value === str);
  return item ? item.second : null;
}


const generateKey = () => {
  const sharedSecret = crypto.randomBytes(32); // key_length = 256 bit
  const textSecret = sharedSecret.toString('base64');

  return {
    plaintext: textSecret,
    creationDate: Date.now()
  }
}

module.exports = {
  convertDateToMilis,
  generateKey
}