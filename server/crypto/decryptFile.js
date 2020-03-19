var encryptor = require("file-encryptor");
var EncryptKey = require("../models/encryptKey");
var KeyStore = require("../models/keyStore");

module.exports = function decryptFile(fileName, keyAlias) {
    EncryptKey.findOne({ alias: keyAlias }, function (err, encryptKey) {
        if (err) return err;
        KeyStore.findById(encryptKey.keyId, function (err, keyStore) {
            if (err) return err;
            // Decrypt file.        
            var key = keyStore.plaintext
            encryptor.decryptFile(`./public/tmp_uploads/encrypted_${fileName}`, `./public/tmp_uploads/output_file.txt`, key, { algorithm: 'aes256' }, function (err) {
                // Decryption complete.
                if (err) return err;
            });
        });
    });
}
