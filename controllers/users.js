const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    console.log("req value contains", req.value.body);
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    //Enforce and make sure req.body contains all the fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ status: true });
  },

  updateUser: async (req, res, next) => {
    //req.body may contains any number of fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ status: true });
  },
};
