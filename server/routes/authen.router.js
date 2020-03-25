const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenController = require('../controllers/authen.controller');

router
  .post(
    '/signin',
    authenController.signin
  )

  .post(
    '/signup',
    authenController.signup)

module.exports = router;
