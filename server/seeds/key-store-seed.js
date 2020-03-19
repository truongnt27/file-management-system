var KeyStore = require("../models/keyStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");
var keys = [
    new KeyStore({
        plaintext: 'iVhfrNmHtrdQVvjN6ltswhnD9H4nwDp3C1Eg35oYl/4=',
        createdDate: Date.now()
    }),
    new KeyStore({
        plaintext: 'I1SiuG2P9Ach93BzsEFkSm1dXd1wI9w3j2kPYXamGrI=/4=',
        createdDate: Date.now()
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
