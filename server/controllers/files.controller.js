const FileStore = require('../models/fileStore');
const KeyStore = require('../models/keyStore');
const encryptFile = require('../crypto/encryptFile');
const decryptFile = require('../crypto/decryptFile');

const { isEmpty } = require('lodash');

module.exports = {
  get: async (req, res, next) => {
    try {
      const files = await FileStore.find();
      res.status(200).json({
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

      const fileStore = new FileStore({
        name: file.originalname,
        owner,
        keyId,
        size: file.size
      })

      const result = await fileStore.save();
      encryptFile(`${owner}/${req.file.originalname}`, keyId);
      res.status(200).json({
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

