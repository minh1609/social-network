const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(bodyParser.json());

//Define Route
require("./routes/stream")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
