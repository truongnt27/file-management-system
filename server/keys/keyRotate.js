var KeyStore = require("../models/keyStore");
var EncryptKey = require("../models/encryptKey");
var UserStore = require("../models/userStore");
var mongoose = require("mongoose");
var crypto = require("crypto");
var encryptFile = require("../crypto/encryptFile")

mongoose.connect("mongodb://localhost:27017/keymanagementsys");
const TIME_TO_ROTATE = 1000 * 60 * 2; //2 minutes

var rotateFunc = function () {
    setInterval(keyRote, 1000 * 60 * 2);
}
rotateFunc();
function keyRote() {
    EncryptKey.find({
        rotation: "true",
        // createdDate: { $gte: Date.now() - TIME_TO_ROTATE - 1000 * 60 * 60 * 24 },
        createdDate: { $lt: Date.now() - TIME_TO_ROTATE }
    },
        function (err, docs) {
            docs.forEach(doc => {
                var sharedSecret = crypto.randomBytes(16); // key_length = 256 bit
                var textSecret = sharedSecret.toString('base64');
                console.log(textSecret);
                var keyStore = new KeyStore({
                    plaintext: textSecret,
                    createdDate: Date.now()
                });
                keyStore.save(function (err, key) {
                    if (err) console.log(err);
                    if (key) {
                        doc.keyId = key;
                        doc.save(function (err) {
                            if (err) return err;
                            UserStore.find(function (err, users) {
                                for (const user of users) {
                                    for (const file of user.files) {
                                        if (hasKey(file, doc.alias)) {
                                            encryptFile(file.file, doc.alias);
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
}

function hasKey(files, keyAlias) {
    return files.key == keyAlias;
}

