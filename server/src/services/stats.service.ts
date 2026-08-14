import { AnalyticsEvent } from "../models/analytics.model";

export const getAnalyticsStats = async () => {
  const [totalVisits, loginAttempts] = await Promise.all([
    AnalyticsEvent.countDocuments({ type: "visit" }),
    AnalyticsEvent.countDocuments({ type: "login_attempt" }),
  ]);

  return {
    totalVisits,
    loginAttempts,
  };
};