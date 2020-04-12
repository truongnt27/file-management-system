const KeyStore = require('../models/keyStore');
const CryptoKey = require('../models/cryptoKey');
const FileStore = require('../models/fileStore');
const Log = require('../models/eventLog');
const { isEmpty } = require('lodash');
const genCryptoKey = require('../keys/keyGen');

module.exports = {
  get: async (req, res) => {
    console.log('req.user', req.session.passport);

    const keys = await KeyStore.find().lean();
    res.status(200).json({
      status: "SUCCESS",
      data: {
        keys: keys
      }
    })
  },

  update: async (req, res) => {
    const { key } = req.body;
    const { keyId } = req.params;

    if (isEmpty([keyId, key])) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing key info"
      })
    }

    try {
      const resultKey = await KeyStore.findOneAndUpdate({ _id: keyId }, key, { new: true });
      if (key.status) {
        await FileStore.updateMany({ keyId }, { status: key.status });
      }
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          key: resultKey
        }
      })

    } catch (error) {
      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
  },

  store: async (req, res) => {
    const key = req.body.key;
    if (!key) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing key info"
      })
    }
    try {
      const cryptoKey = new CryptoKey(genCryptoKey());
      const savedkey = await cryptoKey.save();
      const status = "ENABLE";
      const creationDate = Date.now();

      const keyStore = KeyStore({
        ...key,
        status,
        creationDate,
        cryptoKeyId: savedkey._id
      });

      const resultKey = await keyStore.save();

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          key: resultKey
        }
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
  },

  delete: async (req, res) => {
    const { keyId } = req.params;
    console.log(keyId);

    if (isEmpty(keyId)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing key info"
      })
    }

    try {

      await KeyStore.deleteOne({ _id: keyId });

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          keyId
        }
      })

    } catch (error) {
      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
  },

  getByAlias: async (req, res) => {
    const keyAlias = req.params.keyAlias;

    if (isEmpty(keyAlias)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing key alias"
      })
    }
    try {
      const key = await KeyStore.findOne({ alias: keyAlias });

      if (isEmpty(key)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Key not found"
        })
      }

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          key: key
        }
      })
    } catch (error) {
      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
  }
}

