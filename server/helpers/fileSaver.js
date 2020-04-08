const multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const owner = req.body.owner || null;
    const dir = `./public/uploads/${owner}`;
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