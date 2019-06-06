const express = require("express");
const Stream = require("../model/stream");
const router = express.Router();

// route: api/stream

// get all stream in database
// Public

router.get("/", (req, res) => {
    Stream.find({}, (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

router.post("/", (req, res) => {
    const { userId, title, description } = req.body;

    const newStream = new Stream({
        userId,
        title,
        description
    });
    newStream.save(err => {
        res.send(err);
    });

    res.send(newStream);
});

router.get("/:id", (req, res) => {});

module.exports = router;
