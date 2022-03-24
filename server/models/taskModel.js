const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    uid: { type: String, required: [true, 'Please enter an id'] },
    submittedBy: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    taskId: {
        type: Number,
        required: [true, 'Please enter a task id'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },   
  },
);

module.exports = mongoose.model('task', taskSchema);
