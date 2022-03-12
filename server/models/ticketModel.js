const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    submittedBy: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
    },
    assignedTo: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    summary: {
      type: String,
      required: [true, 'Please enter a summary'],
    },
    dueDate: {
      type: String,
      required: [true, 'Please enter a date'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('ticket', ticketSchema);
