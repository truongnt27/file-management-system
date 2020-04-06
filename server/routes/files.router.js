const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files.controller');
const upload = require('../helpers/fileSaver');

router
  .get('/', filesController.get)
  .post(
    '/',
    upload.single('file'),
    filesController.store
  )

module.exports = router;
