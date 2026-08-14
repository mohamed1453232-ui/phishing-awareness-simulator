import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  const password = process.env.PASSWORD;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!password) {
    throw new Error("PASSWORD is not defined");
  }

  const connectionString = mongoUri.replace("<db_password>", password);

  try {
    await mongoose.connect(connectionString);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};