const express = require('express');

const server = express();

server.get("/", (req, res) => {
    res.end("Hello Pat!");
});

server.listen(5000, () => {
    console.log("server has started on port 5000");
});