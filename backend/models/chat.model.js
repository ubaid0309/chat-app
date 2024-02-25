// import mongoose, { Document, Schema, Types, model } from "mongoose";
const mongoose = require("mongoose");
// interface IChatModel extends Document {
//   chatName: string;
//   isGroupChat: boolean;
//   users: mongoose.Schema.Types.ObjectId[];
//   groupAdmin: Types.ObjectId;
//   latestMessage: Types.ObjectId;
// }

const ChatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chat", ChatSchema);

module.exports = ChatModel;
