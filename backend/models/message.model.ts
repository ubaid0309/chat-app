import mongoose, { Document, Schema, Types, model } from "mongoose";

interface IMessageModel extends Document {
  sender: Types.ObjectId;
  message: string;
  reciever: Types.ObjectId;
}

const MessageSchema = new Schema<IMessageModel>(
  {
    sender: { type: Types.ObjectId, ref: "User" },
    message: { type: String },
    reciever: { type: Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);

export default MessageModel;
