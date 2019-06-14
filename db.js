require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DB_URL ||
                "mongodb+srv://ADMIN-MINH:mM160997%40@cluster0-efrdl.mongodb.net/main",
            {
                useNewUrlParser: true
            }
        );
        console.log("database connected");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;
