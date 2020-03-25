const passport = require('passport');
const UserStore = require('../models/userStore');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

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
  usernameField: 'userId',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, userId, password, done) {

  UserStore.findOne({ userId }, function (err, user) {

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

passport.use('local.signup', new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'password',

  passReqToCallback: true
}, function (req, userId, password, done) {

  UserStore.findOne({ 'userId': userId }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false);
    }

    const newUser = new UserStore({
      userId: userId,
      password: password,
      type: "user",
    });

    newUser.save(function (err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));