const passport = require('passport');
const UserStore = require('../models/userStore');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { check, validationResult } = require('express-validator');
const config = require('../config.json');

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserStore.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {

  UserStore.findOne({ email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

const opts = {}

opts.jwtFromRequest = function (req) {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies['authToken'];
  }
  return token;
};

opts.secretOrKey = config.jwtConfig.secret;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await UserStore.findOne({ _id: jwt_payload.id });
    if (user) {
      user.lastActive = Date.now();
      await user.save();
      return done(null, user);
    }
    return done(err, false);
  } catch (err) {
    return done(null, false);
  }

}));