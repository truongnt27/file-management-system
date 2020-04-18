const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = {
  signin: (req, res, next) => {
    return passport.authenticate('local.signin', { session: false }, (err, user, info) => {

      if (!user || err) {
        return res.status(401).json({
          status: "FAILED",
          message: "Invalid username or password"
        })
      }

      const payload = { id: user._id, name: user.fullname };
      const token = jwt.sign(payload, config.jwtConfig.secret, config.jwtConfig.option);

      return res
        .status(200)
        .cookie('authToken', token, { httpOnly: true, samesite: true, signed: true, maxAge: 10 * 86400 * 1000 })
        .json({
          status: "SUCCESS",
          token,
          data: {
            user
          }
        });
    })(req, res, next)
  },

  signup: (req, res, next) => {
    return passport.authenticate('local.signup', (err, user, info) => {

      if (!user || err) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid username or password"
        })
      }

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          id: user.userId
        }
      });
    })(req, res, next)
  },
  signout: (req, res, next) => {
    return res
      .status(200)
      .clearCookie('authToken', { httpOnly: true })
      .json({
        status: "SUCCESS",
        message: "Signed out"
      })
  },

  // facebook: (req, res, next) => {
  //   return res.status(200).json({
  //     status: "SUCCESS",
  //   });
  // },

  google: (req, res, next) => {
    return res.redirect('http://localhost:3000/?email=' + req.user.email);
    // return res.status(200).json({
    //   status: "SUCCESS",
    //   data: {
    //     user: req.user
    //   }
    // }).re;
  },
}