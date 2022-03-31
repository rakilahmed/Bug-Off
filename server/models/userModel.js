const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    uid: { type: String, required: [true, 'Please enter an id'] },
    userId: {
      type: Number,
      required: [true, 'Please enter a user id'],
    },
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
    },
    ticketCount: {
      type: Number,
      required: [true, 'Please enter ticket count'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('user', userSchema);
