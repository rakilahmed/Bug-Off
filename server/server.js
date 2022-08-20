require('dotenv').config({ path: './config/.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');
const taskRoutes = require('./routes/taskRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

connectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/api', (_, res) => {
  res.status(201).json({
    who_are_we: 'Bug Off Team',
    endpoints: {
      'api/tickets': 'To get all the tickets of the user',
      'api/tasks': 'To get all the tasks of the user',
      'api/employees': 'To get all the employees of the user',
    },
    note: 'You must be a verified user',
  });
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/employees', employeeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app
    .get(
      [
        '/register',
        '/login',
        '/forgot-password',
        '/',
        '/tickets',
        '/employees',
        '/profile',
      ],
      (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      }
    )
    .get('*', (req, res) => {
      res.json({
        error: 'Page not found, check the url',
      });
    });
}

app.listen(port, () => {
  console.log(
    `=> ${process.env.NODE_ENV} server is running on port: ${port} <=`
  );
});
