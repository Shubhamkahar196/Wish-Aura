import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);