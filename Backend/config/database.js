const mongoose = require("mongoose");

moongose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

moongose.connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
