const express = require("express");
const router = express.Router();
const Library = require("../models/library");
const Book = require("../models/book");

//LIBRARY ROUTE

//NEW GET ROUTE
router.get("/new", (req, res) => {
  res.render("libraries/new.ejs");
});

//NEW POST ROUTE
router.post("/", (req, res) => {
  Library.create(req.body, (err, createdLibrary) => {
    console.log(createdLibrary)
    res.redirect("/library/" + createdLibrary._id)
  });
});

//EDIT GET ROUTE
router.get("/:id/edit", (req, res) => {
  Library.findById(req.params.id, (err, foundLibrary) => {
    res.render("libraries/edit.ejs", {
      library: foundLibrary
    });
  });
});

//EDIT PUT ROUTE
router.put("/:id", (req, res) => {
  Library.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/library/" + req.params.id);
  })
})

//DELETE ROUTE
router.delete("/:id", (req, res) => {
  Library.findByIdAndRemove(req.params.id, (err, deletedLibrary) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/");
    }
      // if (err) {
    //   console.log(err);
    // } else {
    //   books.remove({
    //     _id: {
    //       $in: deletedLibrary.books
    //     }
    //   }, (err, data) => {
    //     console.log(data)
    //     res.redirect("/")
    //   });
    // };
  });
});

//SHOW GET ROUTE
router.get("/:id", (req, res) => {
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

//BOOK ROUTES

//NEW GET ROUTE
router.get("/:id/book/new", (req, res) => {
  Library.findById(req.params.id, (err, foundLibrary) => {
    console.log(foundLibrary)
    res.render("books/new.ejs", {
      library: foundLibrary
    });
  });
});

//NEW POST ROUTE
router.post("/:id/book", (req, res) => {
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
          res.redirect("/library/" + req.params.id)
        });
      });
    };
  });
});

module.exports = router;