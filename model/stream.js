const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String
});
module.exports = Stream = mongoose.model("stream", streamSchema);
