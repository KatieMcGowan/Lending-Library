const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  library: {
    type: String,
    //does this need to ref library object? 
  },
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;