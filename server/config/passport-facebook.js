const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const UserStore = require('../models/userStore');
const { facebook: fbConfig } = require('../config.json');


passport.use('facebook', new FacebookStrategy({
  clientID: fbConfig.FACEBOOK_APP_ID,
  clientSecret: fbConfig.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3002/api/auth/facebook/callback",
  profileFields: ['displayName', 'email', 'gender']
}, async function (accessToken, refreshToken, profile, done) {

  try {
    const id = profile.id;
    const { name, picture, email } = profile._json;
    const existedUser = await UserStore.findOne({ facebookId: id });

    if (existedUser) {
      done(null, existedUser);
    }
    else {
      const randomPwd = Math.random().toString(36).slice(-8);
      const newUser = new UserStore({
        email,
        fullname: name,
        avatarPicture: picture,
        facebookId: id,
        password: randomPwd
      })
      const savedUser = await newUser.save();
      if (savedUser) {
        done(null, savedUser);
      }
    }
  } catch (error) {
    done(error)
  }
}
));