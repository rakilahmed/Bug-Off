const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => res.redirect('/api/tickets'));
app.use('/api/tickets', require('./routes/ticketRoutes.js'));

mongoose.connect(process.env.DB_URI, () =>
  console.log('DB connection successful!')
);

app.listen(port, () => console.log(`Server running on port: ${port}`));
