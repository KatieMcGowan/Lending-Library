const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Library = require("../models/library");

router.get("/", (req, res) => {
  Library.find({}, (err, foundLibrary) => {
    res.render("books/new.ejs", {
      library: foundLibrary
    });
  });
});

router.post("/", (req, res) => {
  Book.create(req.body, (err, createdBook) => {
    if (err) {
      res.send(err);
    } else {
      Library.findById(req.body.libraryId, (error, foundLibrary) => {
        foundLibrary.books.push(createdBook);
        foundLibrary.save((err, savedLibrary) => {
          res.redirect("/library/:id")
        });
      });
    };
  });
});

module.exports = router;