const express = require('express');
const router = express.Router();
const passport = require('passport');

const keyController = require('../controllers/keys.controller');

router
  .get('/', passport.authenticate('jwt'), keyController.get)
  .get('/:keyAlias', keyController.getByAlias)
  .post('/', keyController.store)
  .put('/:keyId', keyController.update)
  .delete('/:keyId', keyController.delete)

module.exports = router;
