const express = require("express");
const router = express.Router();
const Library = require("../models/library");

//NEW GET ROUTE
router.get("/library/new", (req, res) => {
  res.render("libraries/new.ejs");
});

module.exports = router;