const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbConnect = require("./config/database")

require("dotenv").config()
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json());

dbConnect()

app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/banker',require('./routes/banker'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


