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
  // update notification: mark as read
  update: async (req, res, next) => {
    console.log('req.params', req.params);

    const notifiId = req.params.id;
    console.log('notifiId', notifiId);

    const userId = req.user._id;
    try {
      const noti = await Notification.findOneAndUpdate({ _id: notifiId }, { $push: { readBy: userId } });
      const { readBy, sender, message, creationDate, _id } = noti;

      const notification = {
        _id,
        message,
        sender,
        creationDate,
        isRead: true
      }
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          notification
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

      const convertedNotifis = notifications.map(noti => {
        const { readBy = [], sender, message, creationDate, _id } = noti;
        const isRead = readBy.indexOf(userId) === -1 ? false : true;

        return ({
          _id,
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