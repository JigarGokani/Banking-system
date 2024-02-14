const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbConnect = require("./config/database")

require("dotenv").config()
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

// Set up CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://banking-system-gamma.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Allow preflight requests to succeed
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());

dbConnect()

app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/banker',require('./routes/banker'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("/",(req,res)=>{
  res.send("WELCOME TO DEFAULT ROUTE!")
})