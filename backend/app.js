// I'm putting external dependencies at the top
const express = require("express");
const cors = require("cors");

// my imported code goes here
const { globalContextSqlite } = require(`./data/db-context-sqlite`);

// all routes need to go here
const userRoutes = require("./routes/user-routes");

// creating needed objects
const server = express();

// Make sure the dbContext has properly setup
globalContextSqlite.testConnection();

/* 
  remove this comment and the sync command 
  when migrations are implemented for prod
*/
globalContextSqlite.getSequelize().sync({ force: true });

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

server.use(express.json());

server.use("/api/v1/user", userRoutes);

// I need to catch any errors that happen
server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

server.listen(5000, () => {
  console.log("server has started on port 5000");
});
