const express = require("express");
const router = express.Router();
const Library = require("../models/library");

//NEW GET ROUTE
router.get("/library/new", (req, res) => {
  res.render("libraries/new.ejs");
});

//NEW POST ROUTE
router.post("/", (req, res) => {
  Library.create(req.body, (err, createdLibrary) => {
    res.redirect("/")
  });
});

//SHOW GET ROUTE (KEEP TOWARDS BOTTOM)
router.get("/libraries/:id", (req, res) => {
  Library.findById(req.params.id)
  .populate({path: "books"})
  .exec((err,foundLibrary) => {
    if(err) {
      console.log(err)
    } else {
      res.render("libraries/show.ejs", {
        library: foundLibrary
      });
    }
  })
});


module.exports = router;