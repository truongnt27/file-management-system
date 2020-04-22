const crypto = require('crypto'),
  fs = require('fs');

const Encryptor = {};

Encryptor.encryptFile = function (inputPath, key) {

  const keyBuf = new Buffer.from(key);
  const inputStream = fs.createReadStream(inputPath).on('error', err => err);
  const outputStream = fs.createWriteStream(`${inputPath}.enc`);
  const cipher = crypto.createCipher('aes256', keyBuf);

  inputStream.pipe(cipher).pipe(outputStream);
  fs.unlinkSync(inputPath);
};

Encryptor.decryptFile = function (inputPath, key) {
  const keyBuf = new Buffer.from(key);
  const inputStream = fs.createReadStream(inputPath).on('error', err => err);
  const cipher = crypto.createDecipher('aes256', keyBuf);
  return inputStream.pipe(cipher);
};

module.exports = Encryptor;