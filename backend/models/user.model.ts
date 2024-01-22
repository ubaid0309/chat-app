import { Document, Schema, model } from "mongoose";

interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
}

const UserSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default:
      "https://ik.imagekit.io/lsfjjc0wv/chat-app/default-profile-pic.png?updatedAt=1705928880273",
  },
});

const UserModel = model("User", UserSchema);
