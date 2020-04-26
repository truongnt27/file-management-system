const crypto = require('crypto'),
  path = require('path'),
  fs = require('fs');

const Encryptor = {};

Encryptor.encryptFile = function (inputPath, key) {
  console.log('enc-path', inputPath);

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

Encryptor.rotateFile = function (inputPath, oldKey, newKey) {
  const oldKeyBuf = new Buffer.from(oldKey);
  const newKeyBuf = new Buffer.from(newKey);

  const cipher = crypto.createCipher('aes256', newKeyBuf);
  const decipher = crypto.createDecipher('aes256', oldKeyBuf);
  const dir = path.resolve(inputPath);
  const inputStream = fs.createReadStream(`${dir}.enc`).on('error', err => err);
  const outputStream = fs.createWriteStream(`${dir}.temp`);

  inputStream.pipe(decipher).pipe(cipher).pipe(outputStream).on('finish', () => {
    fs.unlinkSync(`${dir}.enc`);
    fs.renameSync(`${dir}.temp`, `${dir}.enc`);
  });

};

module.exports = Encryptor;
