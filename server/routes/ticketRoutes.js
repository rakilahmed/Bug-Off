const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bug Off');
});

module.exports = router;
