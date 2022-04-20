const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    _id: { type: String, required: [true, 'Please enter an uid'] },
    employees: [
      {
        _id: {
          type: Number,
          required: [true, 'Please enter a employee id'],
        },
        name: {
          type: String,
          required: [true, 'Please enter a name'],
        },
        email: {
          type: String,
          required: [true, 'Please enter an email'],
        },
        ticket_count: {
          type: Number,
          required: [true, 'Please enter a ticket count'],
        },
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('employee', employeeSchema);
