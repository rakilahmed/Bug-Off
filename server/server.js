const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes/ticketRoutes.js');
app.use(apiRoutes);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
