const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const UserStore = require('../models/userStore');
const { facebook: fbConfig } = require('../config.json');


passport.use('facebook', new FacebookStrategy({
  clientID: fbConfig.FACEBOOK_APP_ID,
  clientSecret: fbConfig.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3002/api/auth/facebook/callback",
  profileFields: ['displayName', 'email', 'gender']
},
  function (accessToken, refreshToken, profile, done) {
    done(null, { id: '123' });
  }
));