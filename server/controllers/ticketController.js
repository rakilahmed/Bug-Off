const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  res.status(200).json(tickets);
});

const setTicket = asyncHandler(async (req, res) => {
  if (
    !req.body.submittedBy ||
    !req.body.email ||
    !req.body.assignedTo ||
    !req.body.title ||
    !req.body.summary ||
    !req.body.dueDate
  ) {
    res.status(400);
  }

  const ticket = await Ticket.create({
    submittedBy: req.body.submittedBy,
    email: req.body.email,
    assignedTo: req.body.assignedTo,
    title: req.body.title,
    summary: req.body.summary,
    dueDate: req.body.dueDate
  });

  res.status(201).json(ticket);
});

const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  res.status(200).send(ticket);
});

const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(201).json(updatedTicket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  await ticket.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTickets,
  setTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};