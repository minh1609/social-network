const express = require("express");
const Stream = require("../model/stream");

// route: api/stream

// get all stream in database
// Public

module.exports = app => {
    app.get("/api/stream", async (req, res) => {
        result = await Stream.find({});

        res.send(result);
    });

    app.get("/api/stream/:id", async (req, res) => {
        const id = req.params.id;
        result = await Stream.findById(id);
        res.send(result);
    });

    app.post("/api/stream", async (req, res) => {
        const { userId, title, description } = req.body;

        console.log(req.body);

        const newStream = new Stream({
            userId,
            title,
            description
        });
        await newStream.save();
        res.status(200).send();
    });

    app.delete("/api/stream/:id", async (req, res) => {
        const id = req.params.id;
        await Stream.findByIdAndDelete(id);
        res.send();
    });

    app.patch("/api/stream/:id", async (req, res) => {
        const id = req.params.id;
        await Stream.findByIdAndUpdate(id, req.body);
        res.send();
    });
};
