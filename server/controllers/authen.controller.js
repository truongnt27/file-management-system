const passport = require('passport');

module.exports = {
  signin: (req, res, next) => {
    return passport.authenticate('local.signin', (err, user, info) => {

      if (!user || err) {
        res.status(400).json({
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

  signup: (req, res, next) => {
    return passport.authenticate('local.signup', (err, user, info) => {

      if (!user || err) {
        res.status(400).json({
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
  facebook: {

  }
}