const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

//CONTROLLERS
const librariesController = require("./controllers/libraries");
app.use("/libraries", librariesController);

const booksController = require("./controllers/books");
app.use("/books", booksController);

//INDEX ROUTE
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//MONGOOSE
const connectionString = "mongodb://localhost:27017/test";

mongoose.connect(connectionString, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose error: ", err);
});

//LISTENER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});