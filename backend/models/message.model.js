import { Schema, Types, model } from "mongoose";
const mongoose = require("mongoose");
// interface IMessageModel extends Document {
//   sender: Types.ObjectId;
//   message: string;
//   reciever: Types.ObjectId;
// }

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
