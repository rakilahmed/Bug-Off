const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    _id: { type: String, required: [true, 'Please enter an uid'] },
    tasks: [
      {
        _id: {
          type: Number,
          required: [true, 'Please enter a task id'],
        },
        task: {
          type: String,
          required: [true, 'Please enter a task'],
        },
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('task', taskSchema);
