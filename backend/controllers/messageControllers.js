const asyncHandler = require("express-async-handler");
const MessageModel = require("../models/message.model");
const UserModel = require("../models/userModel");
const ChatModel = require("../models/chat.model");

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        res.status(404).json({ message: "Invalid Inputs" });
    }

    var messageData = {
        sender: req.user._id,
        message: content,
        reciever: chatId
    };


    try {
        var message = await MessageModel.create(messageData);

        message = await message.populate("sender", "name profilePicture");

        message = await message.populate("reciever");

        message = await UserModel.populate(message, {
            path: "reciever.users",
            select: "name profilePicture email",
        })

        await ChatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

const getAllMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await MessageModel.find({
            reciever: chatId
        }).populate("sender", "name profilePicture email").populate("reciever");

        res.status(200).json(messages)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

module.exports = { sendMessage, getAllMessages };