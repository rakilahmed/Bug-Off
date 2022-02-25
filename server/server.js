const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bug Off!');
});

app.listen(PORT, () => console.log('listening!'));
