const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected successfully!!!");
    }catch(err)
    {
        console.log("Internal Server Error - Database were not connected.");
    }
}

module.exports = connectDB;