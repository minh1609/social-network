const express = require("express");
const router = express.Router();

// route: api/stream
// Public

router.get("/", (req, res) => {
    res.send(" stream");
});

module.exports = router;
