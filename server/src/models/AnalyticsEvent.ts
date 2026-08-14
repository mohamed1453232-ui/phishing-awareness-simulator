import mongoose, { Document, Schema } from "mongoose";

export interface IAnalyticsEvent extends Document {
  type: "visit" | "login_attempt";
  createdAt: Date;
}

const analyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    type: {
      type: String,
      enum: ["visit", "login_attempt"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>(
    "AnalyticsEvent",
    analyticsEventSchema
  );