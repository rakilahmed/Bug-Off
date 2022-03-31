const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    uid: { type: String, required: [true, 'Please enter an id'] },
    taskId: {
      type: Number,
      required: [true, 'Please enter a task id'],
    },
    status: {
      type: Boolean,
      required: [true, 'Please enter status'],
    },
    task: {
      type: String,
      required: [true, 'Please enter a task'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('task', taskSchema);
