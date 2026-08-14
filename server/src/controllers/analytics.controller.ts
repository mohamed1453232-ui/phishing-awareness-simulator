import { Request, Response } from "express";
import {
  createAnalyticsEvent,
} from "../services/analytics.service";

export const trackVisit = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    await createAnalyticsEvent("visit");

    res.status(201).json({
      success: true,
      message: "Visit tracked successfully",
    });
  } catch (error) {
    console.error("Failed to track visit:", error);

    res.status(500).json({
      success: false,
      message: "Failed to track visit",
    });
  }
};

export const trackLoginAttempt = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    await createAnalyticsEvent("login_attempt");

    res.status(201).json({
      success: true,
      message: "Login attempt tracked successfully",
    });
  } catch (error) {
    console.error("Failed to track login attempt:", error);

    res.status(500).json({
      success: false,
      message: "Failed to track login attempt",
    });
  }
};