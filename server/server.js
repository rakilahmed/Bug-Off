require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (_, res) => res.redirect('/api'));
app.get('/api', (_, res) => {
  res.status(201).json({
    who_are_we: 'Bug Off Team',
    endpoints: {
      'api/tickets': 'To get all the tickets of the user',
      'api/tasks': 'To get all the tasks of the user',
      'api/users': 'To get all the users of the user',
    },
    note: 'You must be a verified user',
  });
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () =>
  console.log(
    `=> ${process.env.NODE_ENV} server is running on port: ${port} <=`
  )
);
