const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keys.controller');
const { protectedRoute } = require('../helpers/authHelper');

router
  .get(
    '/',
    protectedRoute,
    keyController.get
  )
  .get(
    '/:keyAlias',
    protectedRoute,
    keyController.getByAlias
  )
  .post(
    '/',
    protectedRoute,
    keyController.store
  )
  .put(
    '/:keyId',
    protectedRoute,
    keyController.update
  )
  .delete(
    '/:keyId',
    protectedRoute,
    keyController.delete
  )

module.exports = router;
