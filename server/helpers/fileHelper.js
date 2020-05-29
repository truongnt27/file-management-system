const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const owner = req.user._id;
    const dir = `./public/uploads/${owner}`;
    if (!owner) {
      callback(new Error('Owner field is required'), dir)
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const deleteFile = function (inputPath) {
  const dir = path.resolve(inputPath);
  fs.unlinkSync(dir, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
};

module.exports = {
  saveFile: multer({ storage }),
  deleteFile
}