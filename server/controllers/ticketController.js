const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const tickets = await Ticket.find({ uid });
  res.status(200).json(tickets);
});

const setTicket = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400);
  }

  const ticket = await Ticket.create(data);
  res.status(201).json(ticket);
});

const getTicketById = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  res.status(201).json(ticket);
});

const updateTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  const updatedTicket = await Ticket.findOneAndUpdate({ ticketId }, req.body, {
    new: true,
  });
  res.status(201).json(updatedTicket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    res.status(400);
    throw new Error('No ticket found');
  }

  await ticket.remove();
  res.status(200).json({ ticketId });
});

module.exports = {
  getTickets,
  setTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};
