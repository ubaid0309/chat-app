const expressAsyncHandler = require("express-async-handler");
const ChatModel = require("../models/chat.model");
const UserModel = require("../models/userModel");

const accesChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(404).json({ message: "User id not sent in body" });
    }

    let isChat;

    isChat = await ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email profilePicture"
    })


    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
    }

    else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        try {
            const createdChat = await ChatModel.create(chatData);
            const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate("users", "-password").populate("latestMessage");
            res.status(200).json(fullChat);
        } catch (error) {
            res.status(404).json({ message: error.message });
            console.log(err.message)
        }
    }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const usersChat = await ChatModel.find({ users: { $elemMatch: { $eq: _id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        const userFullChats = await UserModel.populate(usersChat, {
            path: "latestMessage.sender",
            select: "name email profilePicture"
        });

        res.status(200).json(userFullChats);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(err.message)
    }
})

const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.groupUsers || !req.body.groupName) {
        res.status(404).json({ message: "Please provid all the required fields" })
    }

    var users = JSON.parse(req.body.groupUsers);

    if (users.length < 2) {
        res.status(400).json({ message: "Group must have more than two users" });
    }

    users.push(req.user); // add currently logged in user

    try {

        const groupData = {
            chatName: req.body.groupName,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user._id
        }
        const groupChat = await ChatModel.create(groupData);

        const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat)

    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(err.message)
    }
})

const renameGroupChat = expressAsyncHandler(async (req, res) => {
    try {
        const { groupId, groupName } = req.body;

        const updatedChat = await ChatModel.findByIdAndUpdate(groupId, {
            chatName: groupName
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChat) {
            res.status(400).json({ message: "Chat not found" });
        }

        res.status(200).json(updatedChat);

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(err.message)
    }
})

const addToGroupChat = expressAsyncHandler(async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const userExists = await ChatModel.findOne({
            $and: [{ _id: groupId }, { users: userId }]
        });

        if (userExists) {
            res.send("User already exists")
            console.log(userExists)
        }

        const addedUser = await ChatModel.findByIdAndUpdate(groupId,
            {
                $push: { users: userId }
            }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!addedUser) {
            // res.status(400).json({
            //     message: "Chat not found"
            // });
        }

        res.status(200).json(addedUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(err.message)
    }
})

const removeFromGroupChat = expressAsyncHandler(async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const userExists = await ChatModel.findOne({
            $and: [{ _id: groupId }, { users: userId }]
        })


        if (!userExists) {
            res.status(400).json({ message: "User not exist in that group" });
        }

        const removedUser = await ChatModel.findByIdAndUpdate(groupId,
            {
                $pull: { users: userId }
            }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!removedUser) {
            res.status(400).json({
                message: "Chat not found"
            });
        }

        res.status(200).json(removedUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(err.message)
    }
})
module.exports = {
    accesChat,
    fetchChat,
    createGroupChat,
    renameGroupChat,
    addToGroupChat,
    removeFromGroupChat
};