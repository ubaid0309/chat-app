const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./mongoose/connectToDatabase");
const userRoutes = require("./routes/userRoutes")

const PORT = process.env.REACT_APP_PORT || 5000;
connectToDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());



app.use("/api/user", userRoutes)


app.listen(5000, console.log(`listening on port  5000`));
