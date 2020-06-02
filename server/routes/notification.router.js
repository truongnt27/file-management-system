const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');
const { protectedRoute } = require('../helpers/authHelper');

router
  .get(
    '/',
    protectedRoute,
    notificationController.getByCurrentUser
  )
  .post(
    '/',
    protectedRoute,
    notificationController.store
  )

module.exports = router;
