const FileStore = require('../models/fileStore');
const KeyStore = require('../models/keyStore');
const UserStore = require('../models/userStore');
const Log = require('../models/eventLog');
const Encryptor = require('../helpers/encryptFile');
const { encryptFile, decryptFile } = Encryptor;

const { EVENT_TYPE } = require('../helpers/constant');

const { isEmpty } = require('lodash');

module.exports = {
  get: async (req, res, next) => {
    try {
      const { files: fileList } = req.user || [];
      const files = await FileStore
        .find({ _id: { $in: fileList } })
        .populate('owner', 'fullname')
        .populate('keyId, alias');

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
      const file = await FileStore.findOne({ _id: fileId }).populate({ path: 'keyId', select: 'status', populate: { path: 'cryptoKeyId' } });
      const { owner, name, keyId } = file;
      const dir = `${owner}/${name}.enc`;
      const { status, cryptoKeyId } = keyId;

      if (status !== "ENABLE") {
        return res.status(400).json({
          status: "FAILED",
          message: "File is unavailable"
        })
      }
      const key = cryptoKeyId.plaintext;
      const fileStream = decryptFile(`./public/uploads/${dir}`, key);

      fileStream.on('error', err => {
        return next(err);
      })

      const log = new Log({
        time: Date.now(),
        userId: req.user._id,
        description: `${EVENT_TYPE.DOWNLOAD_FILE} ${name}`
      });
      log.save();

      fileStream.pipe(res);
    }
    catch (err) {
      next(err)
    }
  },

  store: async (req, res, next) => {
    try {
      const owner = req.user._id;
      const { keyId } = req.body || null;
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
      const key = await KeyStore.findOne({ _id: keyId }).populate('cryptoKeyId');
      const { permissions = {}, cryptoKeyId } = key;
      await UserStore.updateMany({ _id: { $in: Object.keys(permissions) } }, { $push: { files: result._id } });

      encryptFile(`./public/uploads/${owner}/${req.file.originalname}`, cryptoKeyId.plaintext);

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

