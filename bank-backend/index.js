const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbConnect = require("./config/database")

require("dotenv").config()
const PORT = process.env.PORT;

const corsOptions = {
  origin: 'https://banking-system-gamma.vercel.app',
  // Other cors options if needed
};

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));


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