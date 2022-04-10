const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    _id: { type: String, required: [true, 'Please enter an uid'] },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
    },
    tickets: [
      {
        type: new mongoose.Schema({
          _id: {
            type: Number,
            required: [true, 'Please enter a ticket id'],
          },
          status: {
            type: String,
            required: [true, 'Please enter a ticket status (open/closed)'],
          },
          submitted_by: {
            type: String,
            required: [true, 'Please enter a name'],
          },
          assigned_to: {
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
          priority: {
            type: String,
            required: [true, 'Please enter a priority'],
          },
          due_date: {
            type: Date,
            required: [true, 'Please enter a due date'],
          },
          created_at: {
            type: Date,
            required: [true, 'Please enter a created at date'],
          },
          updated_at: {
            type: Date,
            required: [true, 'Please enter a updated at date'],
          },
        }),
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('ticket', ticketSchema);
