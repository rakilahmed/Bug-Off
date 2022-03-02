const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  res.status(200).json(tickets);
});

const setTicket = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
  }

  const ticket = await Ticket.create({
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json(ticket);
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

  res.status(200).json(updatedTicket);
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
  updateTicket,
  deleteTicket,
};
