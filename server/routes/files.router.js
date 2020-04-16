const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files.controller');
const upload = require('../helpers/fileSaver');
const { protectedRoute } = require('../helpers/authHelper');

router
  .get(
    '/',
    protectedRoute,
    filesController.get
  )
  .get(
    '/:fileId/download',
    protectedRoute,
    filesController.download
  )
  .post(
    '/',
    protectedRoute,
    upload.single('file'),
    filesController.store
  )

module.exports = router;
