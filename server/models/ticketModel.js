const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter a email'],
    },
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('ticket', ticketSchema);
