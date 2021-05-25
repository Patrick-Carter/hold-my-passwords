// I'm putting external dependencies at the top
const express = require("express");
const cors = require("cors");

// my imported code goes here
const dbConnector = require(`./data/db-context-sqlite`);

// all routes need to go here
const userRoutes = require("./routes/user-routes");

// creating needed objects
const server = express();
const db = new dbConnector.dbContext();

// Make sure the dbContext has properly connected
db.testConnection();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

server.use(express.json());

server.use("/api/v1/user", userRoutes);

server.listen(5000, () => {
  console.log("server has started on port 5000");
});
