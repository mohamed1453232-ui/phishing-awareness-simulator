import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/database";
import statsRoutes from "./routes/stats.routes";
import analyticsRoutes from "./routes/analytics.routes";
import adminRoutes from "./routes/admin.routes";
import { requireAdmin } from "./middleware/adminAuth";
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://phishing-awareness-simulator.vercel.app", "https://phishing-awareness-simulator.vercel.app/admin","http://localhost:573"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Phishing Awareness Simulator API is running",
  });
});

app.use("/api/stats", requireAdmin, statsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
