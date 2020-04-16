const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs.controller');
const { protectedRoute } = require('../helpers/authHelper');

router
  .get(
    '/',
    protectedRoute,
    logsController.get
  )
  .get(
    '/:userId',
    protectedRoute,
    logsController.getByUserId
  )

module.exports = router;
