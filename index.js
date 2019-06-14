const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(bodyParser.json());

//Define Route

require("./routes/stream")(app);

if (process.env.NODE_ENV === "production") {
    //If route do not match express round, try to match it with React Router
    app.use(express.static("client/build"));
    const path = require("path");

    //If route is not defined, send back HTML file
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
