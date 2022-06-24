const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Library = require("../models/library");

router.get("/library/:id/book", (req, res) => {
  res.render("books/new.ejs")
});

module.exports = router;