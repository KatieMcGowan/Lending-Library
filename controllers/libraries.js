const express = require("express");
const router = express.Router();
const Library = require("../models/library");

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
  console.log("AHAHHHAHA")
  Library.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/library/" + req.params.id);
  })
})

//DELETE ROUTE
router.delete("/:id", (req, res) => {
  Library.findByIdAndRemove(req.params.id, (err, deletedLibrary) => {
    if (err) {
      console.log(err);
    } else {
      books.remove({
        _id: {
          $in: deletedLibrary.books
        }
      }, (err, data) => {
        console.log(data)
        res.redirect("/")
      });
    };
  });
});

//SHOW GET ROUTE (KEEP TOWARDS BOTTOM)
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

module.exports = router;