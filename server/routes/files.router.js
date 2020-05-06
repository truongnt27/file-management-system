const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files.controller');
const { saveFile } = require('../helpers/fileHelper');
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
    saveFile.single('file'),
    filesController.store
  )
  .delete(
    '/:fileId',
    protectedRoute,
    filesController.delete
  )

module.exports = router;
