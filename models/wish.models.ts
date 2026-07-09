import { Schema, model, models, Types } from "mongoose";

const WishSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Birthday",
        "Anniversary",
        "Friendship",
        "Love",
        "Festival",
      ],
      required: true,
    },

    theme: {
      type: String,
      enum: ["Classic", "Elegant", "Party"],
      default: "Classic",
    },

    images: {
      type: [String],
      default: [],
    },

    guestId: {
      type: String,
      default: null,
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },

    published: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Wish = models.Wish || model("Wish", WishSchema);