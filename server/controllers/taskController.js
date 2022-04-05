const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const tasks = await Task.find({ _id });
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400);
  }

  const task = await Task.create(data);
  res.status(201).json(task);
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ taskId });

  if (!task) {
    res.status(400);
    throw new Error('No task found');
  }

  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ taskId });

  if (!task) {
    res.status(400);
    throw new Error('No task found');
  }

  const updatedTask = await Task.findOneAndUpdate({ taskId }, req.body, {
    new: true,
  });
  res.status(201).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ taskId });

  if (!task) {
    res.status(400);
    throw new Error('No task found');
  }

  await task.remove();
  res.status(200).json({ taskId });
});

module.exports = {
  getTasks,
  setTask,
  getTaskById,
  updateTask,
  deleteTask,
};
