const passport = require('passport');
const { USER_TYPES } = require('./constant');

const protectedRoute = passport.authenticate('jwt', { session: false });

const isManager = (req, res, next) => {
  const user = req.user;
  const type = user.type || '';

  if (type === USER_TYPES.MANAGER) {
    next();
  }
  return res.status(403).json({
    status: 'FAILED',
    message: 'You don\'t have permission access !'
  })
}

module.exports = {
  protectedRoute,
  isManager
}