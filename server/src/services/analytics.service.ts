import {
  AnalyticsEvent,
  AnalyticsEventType,
} from "../models/analytics.model";

export const createAnalyticsEvent = async (
  type: AnalyticsEventType
): Promise<void> => {
  await AnalyticsEvent.create({ type });
};