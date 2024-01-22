const express = require("express");


const app = express();

const chats = require("./data/data");

require("dotenv").config();

const cors = require("cors");
const connectToDatabase = require("./mongoose/connectToDatabase");

connectToDatabase();

const PORT = process.env.REACT_APP_PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.get("/", (req, res) => {
  res.send("Api is running ");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(PORT, console.log(`listening on port  ${PORT}`));
