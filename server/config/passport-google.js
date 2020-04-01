const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserStore = require('../models/userStore');
const { google: ggConfig } = require('../config.json');

passport.use('google', new GoogleStrategy({
  clientID: ggConfig.GOOGLE_CLIENT_ID,
  clientSecret: ggConfig.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3002/api/auth/google/callback",
  profileFields: ['displayName', 'email']
},
  async function (accessToken, refreshToken, profile, done) {
    console.log("accessToken", accessToken);

    try {
      const { id } = profile;
      const { name, picture, email } = profile._json;
      const existedUser = await UserStore.findOne({ googleId: id });
      if (existedUser) {
        done(null, existedUser);
      }
      else {
        const randomPwd = Math.random().toString(36).slice(-8);
        const newUser = new UserStore({
          email,
          fullname: name,
          avatarPicture: picture,
          googleId: id,
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