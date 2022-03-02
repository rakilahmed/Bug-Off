const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/api/tickets');
});
app.use('/api/tickets', require('./routes/ticketRoutes.js'));

mongoose.connect(process.env.MONGO_URI, () =>
  console.log('DB connection successful!')
);

app.listen(process.env.PORT || 5050, () =>
  console.log(`Server running: http://localhost:${process.env.PORT || 5050}`)
);
