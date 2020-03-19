var encryptor = require("file-encryptor");
var EncryptKey = require("../models/encryptKey");
var KeyStore = require("../models/keyStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

module.exports = function encryptFile(fileName, keyAlias) {
    EncryptKey.findOne({ alias: keyAlias }, function (err, encryptKey) {
        if (err) return err;
        KeyStore.findById(encryptKey.keyId, function (err, keyStore) {
            if (err) return err;
            const key = keyStore.plaintext;
            encryptor.encryptFile(`../public/tmp_uploads/${fileName}`, `../public/tmp_uploads/encrypted_${fileName}.dat`, key, { algorithm: 'aes256' }, function (err) {
                if (err) console.error(err);
                return 1;
            });
        });
    });
}
