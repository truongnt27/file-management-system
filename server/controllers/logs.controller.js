const Log = require('../models/eventLog');
const { isEmpty } = require('lodash');
module.exports = {
  get: async (req, res, next) => {
    try {
      const logs = await Log.find().populate('userId', 'fullname avatarPicture');
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          logs
        }
      })
    } catch (err) {
      next(err);
    }
  },

  getByUserId: async (req, res, next) => {
    try {
      const userId = req.body;
      if (isEmpty(userId)) {
        return res.status(400).json({
          status: 'FAILED',
          message: 'Missing info'
        })
      }
      const logs = await Log.find({ userId });
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          logs
        }
      })

    } catch (err) {
      next(err);
    }
  }
}