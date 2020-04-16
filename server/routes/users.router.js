const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const { protectedRoute } = require('../helpers/authHelper');

router
  .get(
    '/',
    protectedRoute,
    userController.get
  )
  .get(
    '/:userId',
    protectedRoute,
    userController.getById
  )
  .post(
    '/',
    protectedRoute,
    userController.store
  )
  .put(
    '/:userId',
    protectedRoute,
    userController.update
  )
  .delete(
    '/:userId',
    protectedRoute,
    userController.delete
  )

module.exports = router;
