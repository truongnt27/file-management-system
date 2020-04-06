const FileStore = require('../models/fileStore');
const KeyStore = require('../models/keyStore');

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

  store: async (req, res, next) => {
    try {
      const { keyId, userId } = req.body || null;
      const file = req.file || null;

      if (isEmpty(keyId) || isEmpty(file)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing files info"
        })
      }
      const fileStore = new FileStore({
        name: file.originalname,
        owner: userId,
        keyId,
        size: file.size
      })
      const result = await fileStore.save();

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

