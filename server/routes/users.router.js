const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router
  .get('/', userController.get)
  .get('/:userId', userController.getById)
  .post('/', userController.store)
  .put('/:userId', userController.update)
  .delete('/:userId', userController.delete)

module.exports = router;
