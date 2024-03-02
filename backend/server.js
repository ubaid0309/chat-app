const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./mongoose/connectToDatabase");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.REACT_APP_PORT || 5000;
connectToDatabase();

app.use(cors()); // Allow requests from all origins

app.use(express.json());



app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes);


app.listen(5000, console.log(`listening on port  5000`));
