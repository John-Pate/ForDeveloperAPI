import mongoose, { Schema, model, Document } from "mongoose";
import { IRole } from "./role.model";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", UserSchema, "users");

export default User;
export { IUser };
