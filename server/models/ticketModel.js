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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('ticket', ticketSchema);
