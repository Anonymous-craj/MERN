const express = require("express");
const connectToDatabase = require("./database");
const app = express();
const Book = require("./model/bookModel");
//Alternative
// const app = require("express")();

app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Success",
  });
});

//Create Operation
app.post("/book", async (req, res) => {
  const {
    bookName,
    bookPrice,
    bookAuthor,
    isbnNumber,
    publishedAt,
    publication,
  } = req.body;
  await Book.create({
    bookName,
    bookPrice,
    bookAuthor,
    isbnNumber,
    publishedAt,
    publication,
  });
  res.status(201).json({
    message: "Book created successfully!",
  });
});

//Read Operation
app.get("/book", async (req, res) => {
  console.log(req.body);
  const books = await Book.find(req.body); //Returns array
  res.status(200).json({
    message: "Books fetched successfully!",
    data: books,
  });
});

//Single Read Operation
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id); //Object return garxa
    if (!book) {
      res.status(404).json({
        message: "Nothing found!",
      });
    } else {
      res.status(200).json({
        message: "Single book fetched successfully!",
        data: book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

//Delete Operation
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  await Book.findByIdAndDelete(id); //Kehi return gardeina (null)
  res.status(200).json({
    message: "Book deleted successfully!",
  });
});

//Update Operation
app.patch("/book/:id", async (req, res) => {
  const id = req.params.id;
  const {
    bookName,
    bookPrice,
    bookAuthor,
    isbnNumber,
    publishedAt,
    publication,
  } = req.body;
  await Book.findByIdAndUpdate(id, {
    bookName,
    bookPrice,
    bookAuthor,
    isbnNumber,
    publishedAt,
    publication,
  });
  res.status(200).json({
    message: "Book updated successfully!",
  });
});

app.listen(3000, () => {
  console.log("Nodejs server has started at port 3000");
});
