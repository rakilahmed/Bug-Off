const express = require('express');
const router = express.Router();
const {
  getTickets,
  setTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

router.route('/').get(getTickets).post(setTicket);
router.route('/:id').put(updateTicket).delete(deleteTicket);

module.exports = router;
