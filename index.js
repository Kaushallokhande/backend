const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/mailer', require('./routes/mailer.js'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
