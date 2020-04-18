const FileStore = require('../models/fileStore');
const KeyStore = require('../models/keyStore');
const Log = require('../models/eventLog');
const encryptFile = require('../crypto/encryptFile');
const decryptFile = require('../crypto/decryptFile');

const { EVENT_TYPE } = require('../helpers/constant');

const { isEmpty } = require('lodash');

module.exports = {
  get: async (req, res, next) => {
    try {
      const files = await FileStore.find();
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          files
        }
      })
    }
    catch (err) {
      next(err)
    }
  },

  download: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      const file = await FileStore.findOne({ _id: fileId });
      const { owner, name, keyId } = file;
      const dir = `${owner}/${name}`;
      //decryptFile(dir, keyId);

      const log = new Log({
        time: Date.now(),
        userId: req.user._id,
        description: `${EVENT_TYPE.DOWNLOAD_FILE} ${name}`
      });

      log.save();

      res.download(`./public/uploads/${dir}`);
    }
    catch (err) {
      next(err)
    }
  },

  store: async (req, res, next) => {
    try {
      const { keyId, owner } = req.body || null;
      const file = req.file || null;

      if (isEmpty(keyId) || isEmpty(file)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing files info"
        })
      }

      const log1 = new Log({
        time: Date.now(),
        userId: req.user._id,
        description: `${EVENT_TYPE.UPLOAD_FILE} ${file.originalname}`
      });

      const logged = await log1.save();

      const fileStore = new FileStore({
        name: file.originalname,
        owner,
        keyId,
        size: file.size,
        activities: [logged._id]
      })

      const result = await fileStore.save();

      encryptFile(`${owner}/${req.file.originalname}`, keyId);

      // const log2 = new Log({
      //   time: Date.now(),
      //   userId: req.user._id,
      //   description: `${EVENT_TYPE.ENCRYPT_FILE} ${file.originalname}`
      // });

      // await log2.save();

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'File saved',
        data: {
          file: result
        }
      })
    }
    catch (err) {
      next(err)
    }
  }
}

