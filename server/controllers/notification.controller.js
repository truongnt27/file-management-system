const Notification = require('../models/notification');
const { isEmpty } = require('lodash');

module.exports = {

  store: async (req, res, next) => {
    const userId = req.user._id;
    const notifi = req.body.notification;

    try {
      const notification = new Notification({
        ...notifi,
        sender: userId,
        creationDate: Date.now()
      });
      const savedNoti = await notification.save();
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          notification: savedNoti
        }
      })
    } catch (err) {
      next(err);
    }
  },

  getByCurrentUser: async (req, res, next) => {
    const userId = req.user._id;
    try {

      const notifications = await Notification.find({ receiver: userId })
        .populate({ path: 'sender', select: 'fullname avatarPicture' })
        .limit(200);
      console.log('notifications', notifications);

      const convertedNotifis = notifications.map(noti => {
        const { readBy = [], sender, message, creationDate } = noti;
        const isRead = readBy.indexOf(userId) === -1 ? false : true;

        return ({
          message,
          sender,
          creationDate,
          isRead
        })
      })
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          notifications: convertedNotifis
        }
      })

    } catch (err) {
      next(err);
    }
  }
}