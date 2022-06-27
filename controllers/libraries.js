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
    res.render("books/new.ejs", {
      library: foundLibrary
    });
  });
});

//NEW POST ROUTE
router.post("/:id/book", (req, res) => {
  Book.create(req.body, (err, createdBook) => {
    if (err) {
      res.send(err);
    } else {
      Library.findById(req.params.id, (error, foundLibrary) => {
        foundLibrary.books.push(createdBook);
        foundLibrary.save((err, savedLibrary) => {
          res.redirect("/library/" + req.params.id)
        });
      });
    };
  });
});

//DELETE ROUTE
// router.delete("/library/:id/book/:id", (req, res) => {
//   Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    // console.log(req.params.id);
    // console.log(deletedBook)
    // Library.findOne({"books": req.params.id}, (err, foundLibrary) => {
    //   console.log(foundLibrary)
      // if (err) {
      //   res.send(err)
      // } else {
    //     foundLibrary.books.remove(req.params.id);
    //     foundLibrary.save((err, updatedLibrary) => {
    //       res.redirect("/library/:id")
    //     };
    //   })
    // });
//   })
// });

router.delete("/:libraryid/book/:bookid", (req, res) => {
  Book.findByIdAndRemove(req.params.bookid, (err, deletedBook) => {
    Library.findOne({"books": req.params.bookid}, (err, foundLibrary) => {
      if (err) {
        res.send(err)
      } else {
        foundLibrary.books.remove(req.params.bookid);
        foundLibrary.save((err, updatedLibrary) => {
          res.redirect("/library/" + req.params.libraryid)
        });
      };
    });
  });      
});

// router.delete('/:id', (req, res)=>{
//   Article.findByIdAndRemove(req.params.id, (err, deletedArticle)=>{
//     Author.findOne({'articles': req.params.id}, (err, foundAuthor) => {
//          if(err){
//             res.send(err);
//           } else {
//             foundAuthor.articles.remove(req.params.id);
//             foundAuthor.save((err, updatedAuthor) => {
//               console.log(updatedAuthor);
//               res.redirect('/articles');
//             })
//           }
//     })
//   });
// });

module.exports = router;