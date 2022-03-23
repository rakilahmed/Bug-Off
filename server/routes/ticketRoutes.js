const express = require('express');
const router = express.Router();
const {
  getTickets,
  setTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');
const { checkAuth } = require('../middleware/checkAuth');

router.route('/').get(checkAuth, getTickets).post(checkAuth, setTicket);
router
  .route('/:id')
  .get(checkAuth, getTicketById)
  .put(checkAuth, updateTicket)
  .delete(checkAuth, deleteTicket);

module.exports = router;
