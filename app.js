const express = require("express");
const connectToDatabase = require("./database");
const app = express();
const Book = require("./model/bookModel");
const fs = require("fs"); //node js ma c jastai file haru read, write or append gardaw inbuilt package deko xa which is called file system
//Alternative
// const app = require("express")();

const { storage, multer } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });

app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Success",
  });
});

//Create Operation
app.post("/book", upload.single("image"), async (req, res) => {
  console.log(req.file);
  let fileName;
  if (!req.file) {
    fileName =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s";
  } else {
    fileName = "http://localhost:3000/" + req.file.filename;
  }
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
    imageUrl: fileName,
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
app.patch("/book/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id; //kun book update garne id ho yo
  console.log(req.file);
  let fileName;
  const oldDatas = await Book.findById(id);
  if (req.file) {
    const oldImagePath = oldDatas.imageUrl;
    console.log(oldImagePath);
    const localHostUrlLength = "http://localhost:3000/".length;
    const newImagePath = oldImagePath.slice(localHostUrlLength);
    console.log(newImagePath);
    fs.unlink(`./storage/${newImagePath}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted successfully!");
      }
    });
    fileName = "http://localhost:3000/" + req.file.filename;
  }
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
    imageUrl: fileName,
  });
  res.status(200).json({
    message: "Book updated successfully!",
  });
});

app.use(express.static("./storage/"));

app.listen(3000, () => {
  console.log("Nodejs server has started at port 3000");
});
