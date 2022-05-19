const express = require('express');
const router = express.Router();
const {
  getTickets,
  setTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAssignedTickets,
  updateAssignedTicket,
  deleteAssignedTicket,
  deleteAllClosedTickets,
} = require('../controllers/ticketController');
const { checkAuth } = require('../middleware/checkAuth');

router.route('/').get(checkAuth, getTickets).post(checkAuth, setTicket);
router
  .route('/:id')
  .get(checkAuth, getTicketById)
  .put(checkAuth, updateTicket)
  .delete(checkAuth, deleteTicket);
router.route('/assigned/:type').get(checkAuth, getAssignedTickets);
router
  .route('/assigned/:type/:id')
  .put(checkAuth, updateAssignedTicket)
  .delete(checkAuth, deleteAssignedTicket);
router.route('/closed/:type').delete(checkAuth, deleteAllClosedTickets);

module.exports = router;
