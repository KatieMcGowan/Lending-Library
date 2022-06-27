const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Library = require("../models/library");

//NEW GET ROUTE
router.get("/new", (req, res) => {
  console.log(req.params.id);
  Library.find({}, (err, foundLibraries) => {
    console.log(foundLibraries)
    res.render("books/new.ejs", {
      library: foundLibraries
    });
  });
});

//NEW POST ROUTE
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

//DELETE ROUTE
router.delete("/library/:id/book/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    console.log(req.params.id);
    console.log(deletedBook)
    Library.findOne({"books": req.params.id}, (err, foundLibrary) => {
      console.log(foundLibrary)
      if (err) {
        res.send(err)
      } else {
        foundLibrary.books.remove(req.params.id);
        foundLibrary.save((err, updatedLibrary) => {
          res.redirect("/library/:id")
        });
      }
    })
  })
});
 
module.exports = router;