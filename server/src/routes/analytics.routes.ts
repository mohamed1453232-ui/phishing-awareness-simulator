import { Router } from "express";
import { AnalyticsEvent } from "../models/AnalyticsEvent";

const router = Router();

router.post("/visit", async (_req, res) => {
  try {
    await AnalyticsEvent.create({
      type: "visit",
    });

    res.status(201).json({
      success: true,
      message: "Visit recorded successfully",
    });
  } catch (error) {
    console.error("Failed to record visit:", error);

    res.status(500).json({
      success: false,
      message: "Failed to record visit",
    });
  }
});

router.post("/login-attempt", async (_req, res) => {
  try {
    await AnalyticsEvent.create({
      type: "login_attempt",
    });

    res.status(201).json({
      success: true,
      message: "Login attempt recorded successfully",
    });
  } catch (error) {
    console.error("Failed to record login attempt:", error);

    res.status(500).json({
      success: false,
      message: "Failed to record login attempt",
    });
  }
});

export default router;