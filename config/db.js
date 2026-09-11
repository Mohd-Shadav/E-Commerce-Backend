const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("✅ Database Connected Successfully!!!");

    } catch (err) {

        console.error("❌ Database Connection Error:");
        console.error(err);

    }
};

module.exports = connectDB;