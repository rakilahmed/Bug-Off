const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUsers = asyncHandler(async (req, res) => {
  //const uid = req.user.uid;
  const users = await User.find();
  res.status(200).json(users);
});

const setUser = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400);
  }

  const user = await User.create(data);
  res.status(201).json(user);
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ userId });

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  }

  res.status(201).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ userId });

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  }

  const updatedUser = await User.findOneAndUpdate({ userId }, req.body, {
    new: true,
  });
  res.status(201).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ userId });

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  }

  await user.remove();
  res.status(200).json({ userId });
});

module.exports = {
  getUsers,
  setUser,
  getUserById,
  updateUser,
  deleteUser,
};
