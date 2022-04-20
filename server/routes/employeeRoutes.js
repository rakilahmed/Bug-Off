const express = require('express');
const router = express.Router();
const {
  getEmployees,
  setEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { checkAuth } = require('../middleware/checkAuth');

router.route('/').get(checkAuth, getEmployees).post(checkAuth, setEmployee);
router
  .route('/:id')
  .get(checkAuth, getEmployeeById)
  .put(checkAuth, updateEmployee)
  .delete(checkAuth, deleteEmployee);

module.exports = router;
