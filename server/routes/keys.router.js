const express = require('express');
const router = express.Router();

const keyController = require('../controllers/keys.controller');

router
  .get('/', keyController.get)
  .get('/:keyAlias', keyController.getByAlias)
  .post('/', keyController.store)
  .put('/:keyAlias', keyController.update)
  .delete('/:keyAlias', keyController.delete)

module.exports = router;
