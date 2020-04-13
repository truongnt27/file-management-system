const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs.controller');

router
  .get('/', logsController.get)
  .get('/:userId', logsController.getByUserId)

module.exports = router;
