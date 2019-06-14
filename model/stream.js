const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    userName: String,
    date: String,
    avatar: String
});
module.exports = Stream = mongoose.model("stream", streamSchema);
