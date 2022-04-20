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

router.route('/').get(getEmployees).post(setEmployee);
router
  .route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
