const crypto = require('crypto');

module.exports = function () {
    const sharedSecret = crypto.randomBytes(32); // key_length = 256 bit
    const textSecret = sharedSecret.toString('base64');
    console.log(sharedSecret.toString('base64'));
    return {
        plaintext: textSecret,
        createdDate: Date.now()
    }
}
