const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const plantsRouter = require("./routes/plants");

// configure app with env variables
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const mongoURL = process.env.URL;

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// initialise database
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.options = {};
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("You have connected to the database.");
  app.listen(PORT, () => {
    console.log(`Plant Finder API is running on :${PORT}`);
  });

  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/plants", plantsRouter);
});

module.exports = app;
