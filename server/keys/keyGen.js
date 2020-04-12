var crypto = require('crypto');

module.exports = function () {
    var sharedSecret = crypto.randomBytes(32); // key_length = 256 bit
    var textSecret = sharedSecret.toString('base64');
    console.log(sharedSecret.toString('base64'));
    return {
        plaintext: textSecret,
        createdDate: Date.now()
    }
}
