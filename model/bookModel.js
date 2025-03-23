const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  bookName: {
    type: String,
    unique: true,
  },
  bookPrice: {
    type: Number,
  },

  bookAuthor: {
    type: String,
  },

  isbnNumber: {
    type: Number,
  },

  publishedAt: {
    type: String,
  },

  publication: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
