const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors);

//Define Route
app.use("/api/stream/", require("./api/stream"));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}

app.listen(port, () => {
    console.log("Running on port" + port);
});
