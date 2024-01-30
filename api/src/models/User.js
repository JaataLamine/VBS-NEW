import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minLength: 9,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
