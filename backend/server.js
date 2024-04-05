const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./mongoose/connectToDatabase");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const PORT = process.env.REACT_APP_PORT;
connectToDatabase();

app.use(cors()); // Allow requests from all origins

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API running successfully")
})
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


const server = app.listen(5000, console.log(`listening on port  ${PORT}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("connected to socket.io" + socket)

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join-chat", (roomId) => {
        socket.join(roomId);
        console.log("User joined room " + roomId)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"))
    socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"))

    socket.on("new-message", (message) => {
        var chat = message.reciever;

        if (!chat.users) return console.log("chat.users not defined")

        chat.users.forEach(user => {
            if (user._id == message.sender._id) return;
            return socket.in(user._id).emit("message-recieved", message)

        });

    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id)
    })
})