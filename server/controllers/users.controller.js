const UserStore = require('../models/userStore');
const { isEmpty } = require('lodash');

module.exports = {
  get: async (req, res) => {
    const id = req.user._id;
    const users = await UserStore.find({ _id: { $ne: id } }).lean();

    return res.status(200).json({
      status: "SUCCESS",
      data: {
        users
      }
    })
  },

  me: async (req, res) => {
    const user = req.user || null;
    if (!user) {
      return res.status(500).json({
        status: "FAILED",
        message: "Something's wrong"
      })
    }
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        user
      }
    })
  },

  update: async (req, res) => {
    const user = req.body.user;
    const id = user.userId;
    if (isEmpty(id)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing user info"
      })
    }
    try {
      const resultUser = await UserStore.findOneAndUpdate({ userId: id }, user);
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          user: resultUser
        }
      })

    } catch (error) {
      next(error);
    }
  },

  store: async (req, res) => {
    const user = req.body.user;
    if (!user) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing user info"
      })
    }
    const userStore = UserStore({ user });
    const resultUser = await userStore.save();
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        user: resultUser
      }
    })
  },

  delete: async (req, res) => {
    const id = req.params.userId;
    if (isEmpty(id)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing user info"
      })
    }

    try {
      await UserStore.deleteOne({ userId: id });

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          userId: id
        }
      })

    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res) => {
    const id = req.params.userId;
    console.log(id);

    if (!id || id == null) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing user id"
      })
    }
    try {
      const user = await UserStore.findOne({ _id: id });

      if (!user || user == null) {
        return res.status(400).json({
          status: "FAILED",
          message: "User not found"
        })
      }

      return res.status(200).json({
        status: "SUCCESS",
        data: {
          user: user
        }
      })
    } catch (error) {
      next(error);
    }

  }
}

