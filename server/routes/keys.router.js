const express = require('express');
const router = express.Router();

const keyController = require('../controllers/keys.controller');

router
  .get('/', keyController.get)
  .get('/:keyAlias', keyController.getByAlias)
  .post('/', keyController.store)
  .put('/:keyId', keyController.update)
  .delete('/:keyId', keyController.delete)

module.exports = router;
