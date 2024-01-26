// import { Document, Schema, model } from "mongoose";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// interface IUserModel extends Document {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture?: string;
// }

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default:
      "https://ik.imagekit.io/lsfjjc0wv/chat-app/default-profile-pic.png?updatedAt=1705928880273",
  },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
