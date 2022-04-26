const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const tickets = await Ticket.find({ _id });
  res.status(200).json(tickets);
});

const setTicket = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const data = req.body;
  const user = await Ticket.findOne({ _id });

  if (!user) {
    const newUser = await Ticket.create(data);
    res.status(201).json(newUser.tickets.pop());
    return;
  }

  const ticketId = data.tickets[0]._id;
  const ticket = user.tickets.find((ticket) => ticket._id === ticketId);

  if (ticket) {
    res.status(400);
    throw new Error('Ticket with that id already exists');
  }

  const modifyUser = await Ticket.findOneAndUpdate(
    { _id },
    { $addToSet: { tickets: data.tickets[0] } },
    {
      new: true,
    }
  );
  res.status(201).json(modifyUser.tickets.pop());
});

const getTicketById = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const ticketId = req.params.id;
  const user = await Ticket.findOne(
    { _id },
    { tickets: { $elemMatch: { _id: ticketId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tickets.length === 0) {
    res.status(400);
    throw new Error('No ticket found');
  }

  res.status(201).json(user.tickets[0]);
});

const updateTicket = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const ticketId = req.params.id;
  const user = await Ticket.findOne(
    { _id },
    { tickets: { $elemMatch: { _id: ticketId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tickets.length === 0) {
    res.status(400);
    throw new Error('No ticket found');
  }

  const data = req.body.tickets[0];
  await Ticket.updateOne(
    { 'tickets._id': ticketId },
    { $set: { 'tickets.$': data } }
  );

  const modifyUser = await Ticket.findOne(
    { _id },
    { tickets: { $elemMatch: { _id: ticketId } } }
  );
  res.status(201).json(modifyUser.tickets.pop());
});

const deleteTicket = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const ticketId = req.params.id;
  const user = await Ticket.findOne(
    { _id },
    { tickets: { $elemMatch: { _id: ticketId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.tickets.length === 0) {
    res.status(400);
    throw new Error('No ticket found');
  }

  await Ticket.updateOne(
    { 'tickets._id': ticketId },
    { $pull: { tickets: { _id: ticketId } } }
  );
  res.status(200).json({ ticketId });
});

module.exports = {
  getTickets,
  setTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};
