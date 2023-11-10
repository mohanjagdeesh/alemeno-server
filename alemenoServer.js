const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const alemenoApp = express();

alemenoApp.use(cors());
alemenoApp.use(express.json({ limit: "50mb" }));
alemenoApp.use(express.urlencoded({ extended: true, limit: "50mb" }));

alemenoApp.get("/", (req, res) => {
  res.send("Welcome To Alemeno Server");
});

// Router Imports
const userRouter = require("./routes/userRouter");
const coursesRouter = require("./routes/courseRouter");

// Defining Routes
alemenoApp.use("/users", userRouter);
alemenoApp.use("/courses", coursesRouter);

mongoose.set("strictQuery", true);

// Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Database Connection Established"))
  .catch((err) => console.error(err));

// Port Assigning
alemenoApp.listen(process.env.PORT, () => {
  console.log(`Server Listening To The Port ${process.env.PORT}`);
});
