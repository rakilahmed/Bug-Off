const { admin } = require('../config/firebase');
const asyncHandler = require('express-async-handler');

const checkAuth = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith('Bearer')) {
    res
      .status(403)
      .json({ error_message: 'No token found', error: 'Unauthorized' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(authToken.split(' ')[1]);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      error_message: 'Token verification failed',
      error: 'Unauthorized',
    });
  }
});

module.exports = { checkAuth };
