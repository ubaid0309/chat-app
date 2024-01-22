import mongoose, { Document, Schema, Types, model } from "mongoose";

interface IChatModel extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: mongoose.Schema.Types.ObjectId[];
  groupAdmin: Types.ObjectId;
  latestMessage: Types.ObjectId;
}

const ChatSchema = new Schema<IChatModel>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupAdmin: { type: Types.ObjectId, ref: "User" },
    latestMessage: { type: Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const ChatModel = model("Chat", ChatSchema);

export default ChatModel;
