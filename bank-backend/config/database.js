const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.DB_URL
console.log(url)

const dbConnect = () =>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connected Successfully!")})
    .catch((error)=>{
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}


module.exports = dbConnect;
