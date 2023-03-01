const app = require("./app");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const server = http.createServer(app);

//config
dotenv.config({ path: "backend/config/config.env" });

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

//unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
