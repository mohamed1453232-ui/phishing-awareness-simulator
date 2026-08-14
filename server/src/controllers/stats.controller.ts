import { Request, Response } from "express";
import { getAnalyticsStats } from "../services/stats.service";

export const getStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const stats = await getAnalyticsStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Failed to fetch analytics stats:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics stats",
    });
  }
};