const mongoose = require("mongoose");
require("dotenv").config()
const db= async () => {
    await mongoose.connect(process.env.DATABASE_URl)
    console.log("connected to DataBase");
}
  
  
  module.exports={db}
