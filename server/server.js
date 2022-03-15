require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');

connectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (_, res) => res.redirect('/api/tickets'));
app.use('/api/tickets', ticketRoutes);

app.listen(port, () =>
  console.log(
    `=> ${process.env.NODE_ENV} server is running on port: ${port} <=`
  )
);
