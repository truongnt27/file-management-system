const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/keymanagementsys");

const CronJob = require('cron').CronJob;
const KeyStore = require('../models/keyStore');
const CryptoKey = require('../models/cryptoKey');
const FileStore = require('../models/fileStore');
const UserStore = require('../models/userStore');
const genKey = require('../helpers/keyGen');
const Encryptor = require('../helpers/encryptFile');

console.log('Start rotate keys');

const job = new CronJob('00 00 00 * * *', function () {
  const keys = await KeyStore.find();
  keys.forEach(key => {
    const { lastRotation, rotation } = key;
    if (lastRotation < Date.now() - rotation) {
      rotate(key._id);
    }
  })
}, null, true);
module.exports = job;


async function rotate(keyId) {
  try {
    const cryptoKey = new CryptoKey(genKey());
    const savedkey = await cryptoKey.save();
    const key = await KeyStore.findOne({ _id: keyId }).populate({ path: 'files', select: 'name owner' }).populate('cryptoKeyId');
    const files = key.files;

    if (!files || !key.cryptoKeyId.plaintext) {
      return;
    }

    files.forEach(file => {
      Encryptor.rotateFile(`../public/uploads/${file.owner}/${file.name}`, key.cryptoKeyId.plaintext, savedkey.plaintext);
    });
    key.cryptoKeyId = savedkey._id;
    key.lastRotation = Date.now();
    await key.save();

  }
  catch (err) {
    console.log(err);
  }
}