const express = require('express');
const cors = require("cors");

const server = express();

server.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

server.use(express.json());

server.use("/api/v1/user");

server.listen(5000, () => {
    console.log("server has started on port 5000");
});