const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Library = require("../models/library");

// ROUTE /library/

router.get("/new", (req, res) => {
  console.log("Hit new route");
  Library.findById(req.params.id, (err, foundLibrary) => {
    res.render("books/new.ejs", {
      library: foundLibrary
    });
  });
});

router.post("/", (req, res) => {
  console.log("NEW ROUTE")
  Book.create(req.body, (err, createdBook) => {
    if (err) {
      res.send(err);
    } else {
      console.log("HIT LIBRARY FIND BY ID ROUTE")
      Library.findById(req.params.id, (error, foundLibrary) => {
        console.log(foundLibrary);
        foundLibrary.books.push(createdBook);
        foundLibrary.save((err, savedLibrary) => {
          res.redirect("/library/:id")
        });
      });
    };
  });
});

module.exports = router;