const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg",
    ];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This file type is not supported!")); //(error case)
      return;
    }
    cb(null, "./storage"); //(error aayo bhane null return in first argument, success)
  },

  filename: function (req, file, cb) {
    cb(null, "Siraj-" + file.originalname); //(error, success)
  },
});

module.exports = {
  storage,
  multer,
};
