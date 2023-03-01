const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
