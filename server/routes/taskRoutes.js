const express = require('express');
const router = express.Router();
const {
  getTasks,
  setTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { checkAuth } = require('../middleware/checkAuth');

router.route('/').get(checkAuth, getTasks).post(checkAuth, setTask);
router
  .route('/:id')
  .get(checkAuth, getTaskById)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

module.exports = router;