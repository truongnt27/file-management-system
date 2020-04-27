const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenController = require('../controllers/authen.controller');

router
  .post(
    '/sign-in',
    authenController.signin
  )
  .post(
    '/sign-up',
    authenController.signup
  )
  .get(
    '/sign-out',
    authenController.signout
  )
  .get(
    '/facebook',
    passport.authenticate('facebook', { scope: 'email' }),
  )
  .get(
    '/facebook/callback',
    passport.authenticate('facebook'),
    authenController.facebook
  )
  .get(
    '/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }),
  )
  .get(
    '/google/callback',
    passport.authenticate('google'),
    authenController.google
  )

module.exports = router;
