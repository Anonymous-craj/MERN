const mongoose = require("mongoose");
const ConnectionString =
  "mongodb+srv://Craj:Craj@cluster0.5m3w7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
  await mongoose.connect(ConnectionString);
  console.log("Connection with database successful!");
}

module.exports = connectToDatabase;
