const express = require("express");
const Stream = require("../model/stream");

// route: api/stream

// get all stream in database
// Public

module.exports = app => {
    app.get("/api/stream", (req, res) => {
        Stream.find({}, (err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
    });

    app.get("/api/stream/:id", (req, res) => {
        const id = req.params.id;
        Stream.findById(id, (err, result) => {
            res.send(result);
        });
    });

    app.post("/api/stream", (req, res) => {
        const { userId, title, description } = req.body;

        console.log(req.body);

        const newStream = new Stream({
            userId,
            title,
            description
        });
        newStream.save();

        res.send(userId);
    });
};
