const KeyStore = require('../models/cryptoKey');
const CryptoKey = require('../models/cryptoKey');
const mongoose = require("mongoose");
const genKey = require('../keys/keyGen');


mongoose.connect("mongodb://localhost:27017/keymanagementsys");

const newKey = genKey();
const key = CryptoKey(newKey);

const keys = [
    new KeyStore({
        // keyId: ,
        userId: 'admin',
        status: 'YEAR',
        rotation: 'YEAR',
        alias: 'key_default',
        description: 'protect data',
        creationDate: Date.now(),
        userPermision: {}
    }),
];
var done = 0;

for (var i = 0; i < keys.length; i++) {
    keys[i].save(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            done++;
            if (done == keys.length) {
                exit();
            }
        }
    });
}
function exit() {
    mongoose.disconnect();
}
