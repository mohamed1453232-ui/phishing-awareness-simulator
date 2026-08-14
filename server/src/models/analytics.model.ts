import mongoose, { Document, Schema } from "mongoose";

export type AnalyticsEventType = "visit" | "login_attempt";

export interface IAnalyticsEvent extends Document {
  type: AnalyticsEventType;
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

export const AnalyticsEvent = mongoose.model<IAnalyticsEvent>(
  "AnalyticsEvent",
  analyticsEventSchema
);