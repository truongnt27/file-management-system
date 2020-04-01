const passport = require('passport');

module.exports = {
  signin: (req, res, next) => {
    return passport.authenticate('local.signin', (err, user, info) => {

      if (!user || err) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid username or password"
        })
      }

      return res.status(200).json({
        status: "SUCCESS",
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