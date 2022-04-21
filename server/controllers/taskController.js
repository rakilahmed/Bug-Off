const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const tasks = await Task.find({ _id });
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const data = req.body;
  const user = await Task.findOne({ _id });

  if (!user) {
    const newUser = await Task.create(data);
    res.status(201).json(newUser.tasks.pop());
    return;
  }

  const taskId = data.tasks[0]._id;
  const task = user.tasks.find((task) => task._id === taskId);

  if (task) {
    res.status(400);
    throw new Error('Task with that id already exists');
  }

  const modifyUser = await Task.findOneAndUpdate(
    { _id },
    { $addToSet: { tasks: data.tasks[0] } },
    {
      new: true,
    }
  );
  res.status(201).json(modifyUser.tasks.pop());
});

const getTaskById = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const taskId = req.params.id;
  const user = await Task.findOne(
    { _id },
    { tasks: { $elemMatch: { _id: taskId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tasks.length === 0) {
    res.status(400);
    throw new Error('No task found');
  }

  res.status(201).json(user.tasks[0]);
});

const updateTask = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const taskId = req.params.id;
  const user = await Task.findOne(
    { _id },
    { tasks: { $elemMatch: { _id: taskId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tasks.length === 0) {
    res.status(400);
    throw new Error('No task found');
  }

  const data = req.body.tasks[0];
  const task = user.tasks.find((task) => task._id === data._id);

  if (task) {
    res.status(400);
    throw new Error('Task with that id already exists');
  }

  await Task.updateOne({ 'tasks._id': taskId }, { $set: { 'tasks.$': data } });

  const modifyUser = await Task.findOne(
    { _id },
    { tasks: { $elemMatch: { _id: taskId } } }
  );
  res.status(201).json(modifyUser.tasks.pop());
});

const deleteTask = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const taskId = req.params.id;
  const user = await Task.findOne(
    { _id },
    { tasks: { $elemMatch: { _id: taskId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tasks.length === 0) {
    res.status(400);
    throw new Error('No task found');
  }

  await Task.updateOne(
    { 'tasks._id': taskId },
    { $pull: { tasks: { _id: taskId } } }
  );
  res.status(200).json({ taskId });
});

module.exports = {
  getTasks,
  setTask,
  getTaskById,
  updateTask,
  deleteTask,
};
