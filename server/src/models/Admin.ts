import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
  role: "admin";
}

const adminSchema = new Schema<IAdmin>(
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
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export const Admin =
  mongoose.models.Admin ||
  mongoose.model<IAdmin>("Admin", adminSchema);