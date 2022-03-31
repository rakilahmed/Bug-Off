const express = require('express');
const router = express.Router();
const {
  getUsers,
  setUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { checkAuth } = require('../middleware/checkAuth');

router.route('/').get(getUsers).post(setUser);
router
  .route('/:id')
  .get(checkAuth, getUserById)
  .put(checkAuth, updateUser)
  .delete(checkAuth, deleteUser);

module.exports = router;
