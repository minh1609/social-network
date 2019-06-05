require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        console.log("database connected");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;
