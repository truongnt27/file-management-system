const FileStore = require('../models/fileStore');
const KeyStore = require('../models/keyStore');
const UserStore = require('../models/userStore');
const Log = require('../models/eventLog');
const Encryptor = require('../helpers/encryptFile');
const { encryptFile, decryptFile } = Encryptor;
const { deleteFile } = require('../helpers/fileHelper');
const { generateKey } = require('../helpers/keyHelper');
const { EVENT_TYPE, FILE_TYPES } = require('../helpers/constant');

const { isEmpty, unionBy } = require('lodash');

module.exports = {
  get: async (req, res, next) => {
    try {
      const { files } = req.user || [];
      const totalFiles = await FileStore.find()
        .populate({ path: 'owner', select: 'fullname email avatarPicture' })
        .populate({ path: 'activities', populate: { path: 'userId', select: 'fullname avatarPicture' } })
        .populate({ path: 'viewers', select: 'fullname email avatarPicture' })
        .populate({ path: 'editors', select: 'fullname email avatarPicture' });
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          files: totalFiles
        }
      })
    }
    catch (err) {
      next(err)
    }
  },

  update: async (req, res, next) => {
    const fileId = req.params.fileId || null;
    const file = req.body.file;

    try {
      const resultFile = await FileStore.findOneAndUpdate({ _id: fileId }, file, { new: true })
        .populate({ path: 'owner', select: 'fullname email avatarPicture' })
        .populate({ path: 'activities', populate: { path: 'userId', select: 'fullname avatarPicture' } })
        .populate({ path: 'viewers', select: 'fullname email avatarPicture' })
        .populate({ path: 'editors', select: 'fullname email avatarPicture' });

      const log = new Log({
        time: Date.now(),
        userId: req.user._id,
        description: `${EVENT_TYPE.UPDATE_FILE} ${file.name}`
      });
      log.save();

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          file: resultFile
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
      const file = req.file || null;

      if (isEmpty(file)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing files info"
        })
      }
      const now = Date.now();
      const log1 = new Log({
        time: now,
        userId: req.user._id,
        description: `${EVENT_TYPE.UPLOAD_FILE} ${file.originalname}`
      });

      const logged = await log1.save();
      const { createdDate, plaintext } = generateKey();

      const key = new KeyStore({
        createdDate,
        plaintext,
        lastRotation: now
      })
      const savedKey = await key.save();

      const extend = file.originalname.split('.').pop();
      const type = FILE_TYPES[extend] || extend;

      const fileStore = new FileStore({
        name: file.originalname,
        owner,
        keyId: savedKey._id,
        size: file.size,
        activities: [logged._id],
        type
      })

      const result = await fileStore.save();

      encryptFile(`./public/uploads/${owner}/${req.file.originalname}`, plaintext);
      await FileStore.populate(result, { path: 'owner', select: 'fullname' });
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
  },
  delete: async (req, res, next) => {
    const { fileId } = req.params;
    if (isEmpty(fileId)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing key info"
      })
    }

    try {
      const file = await FileStore.findOneAndDelete({ _id: fileId });

      await KeyStore.findOneAndUpdate({ _id: file._id }, { $pull: { files: fileId } });

      const log = new Log({
        time: Date.now(),
        userId: req.user._id,
        description: `${EVENT_TYPE.DEL_FILE} ${file.name}`
      });

      await log.save();
      deleteFile(`./public/uploads/${file.owner}/${file.name}.enc`);

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          fileId
        }
      })

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
  }
}

