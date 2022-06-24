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

//EDIT GET ROUTE
router.get("/library/:id/edit", (req, res) => {
  Library.findById(req.params.id, (err, foundLibrary) => {
    res.render("libraries/edit.ejs", {
      library: foundLibrary
    });
  });
});

router.put("/library/:id", (req, res) => {
  Library.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/");
  })
})

//SHOW GET ROUTE (KEEP TOWARDS BOTTOM)
router.get("/library/:id", (req, res) => {
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

//DELETE ROUTE
router.delete("/library/:id", (req, res) => {
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

module.exports = router;