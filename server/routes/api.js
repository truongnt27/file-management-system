var express = require("express");
var router = express.Router();
var EncryptKey = require("../models/encryptKey");
var UserStore = require("../models/userStore");
var EventLog = require("../models/eventLog");

var decryptFile = require('../crypto/decryptFile');
/* get key pair. */
router.get("/decryptFile", function (req, res, next) {
    res.render('decryptFile');
});

router.post("/decryptFile", function (req, res, next) {
    const filename = req.body.filename;
    const userId = req.session.userId;
    const keyAlias = req.body.keyAlias;
    EncryptKey.findOne({ alias: keyAlias }, function (err, key) {
        if (err || !key || (key.status == "disable")) return res.send("Invalid file or key");
        const userPermision = key.userPermision;
        if (!userPermision.includes(userId)) {
            return res.send("You do not permision using this key !");
        }
        else {
            UserStore.find(function (err, users) {
                for (const user of users) {
                    for (const file of user.files) {
                        if (file.file == filename) {
                            if (file.key != keyAlias) {
                                return res.send("Invalid file or key");
                            }
                            else {
                                decryptFile(filename, keyAlias);
                                var event = new EventLog({
                                    event: "decrypt-file",
                                    keyAlias: keyAlias,
                                    userId: req.session.userId,
                                    time: Date.now()
                                });
                                event.save(function (err) {
                                    if (err) console.log(err);
                                });
                                return res.send("Decrypt success");
                            }
                        }
                    }
                }
            });
        }
    });
});

module.exports = router;
