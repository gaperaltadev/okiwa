import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./User.document";

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel =
  mongoose.models.user ||
  mongoose.model<UserDocument>("user", UserSchema, "user");
