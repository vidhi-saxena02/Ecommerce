const app = require("./app");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/database");

const server = http.createServer(app);

//config
dotenv.config({ path: "backend/config/config.env" });

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
