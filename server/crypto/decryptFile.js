var encryptor = require("file-encryptor");
var CryptoKey = require("../models/cryptoKey");
var KeyStore = require("../models/keyStore");

module.exports = async function decryptFile(dir, keyId) {
    try {
        const keyStore = await KeyStore.findOne({ _id: keyId });
        const cryptoKey = await CryptoKey.findOne({ _id: keyStore.cryptoKeyId });
        const key = cryptoKey.plaintext;
        encryptor.decryptFile(`./public/uploads/${dir}`, `./public/uploads/${dir}`, key, { algorithm: 'aes256' }, function (err) {
            return true;
        });
    } catch (err) {
        return err;
    }
}
