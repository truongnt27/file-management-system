const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/keymanagementsys");

const CronJob = require('cron').CronJob;
const KeyStore = require('../models/keyStore');
const FileStore = require('../models/fileStore');
const UserStore = require('../models/userStore');
const Log = require('../models/eventLog');
const { EVENT_TYPE } = require('../helpers/constant');
const { convertDateToMilis } = require('../helpers/keyHelper');

const { generateKey } = require('../helpers/keyHelper');
const Encryptor = require('../helpers/encryptFile');

console.log('Start rotate keys');

const job = new CronJob('00 00 00 * * *', async function () {
  const keys = await KeyStore.find();
  keys.forEach(key => {
    const { lastRotation, rotation } = key;
    const rotationMiliSnd = convertDateToMilis(rotation);
    if (lastRotation < Date.now() - rotationMiliSnd) {
      rotate(key._id);
    }
  })
}, null, true);
module.exports = job;

async function rotate(keyId) {
  try {
    const { creationDate, plaintext } = generateKey();
    const key = await KeyStore.findOne({ _id: keyId });
    const file = await FileStore.findOne({ keyId: keyId }).populate({ path: 'files', select: 'name owner' });

    Encryptor.rotateFile(`../public/uploads/${file.owner}/${file.name}`, key.plaintext, plaintext);

    key.plaintext = plaintext;
    key.lastRotation = creationDate;
    await key.save();

    const log = new Log({
      time: Date.now(),
      userId: file.owner,
      description: `${EVENT_TYPE.ROTATE_KEY} for ${file.name}`
    });
    await log.save()
  }
  catch (err) {
    console.log(err);
  }
}