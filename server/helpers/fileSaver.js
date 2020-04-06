const multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const userId = req.body.userId || null;
    const dir = `./public/uploads/${userId}`;
    console.log(dir);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

module.exports = multer({ storage });