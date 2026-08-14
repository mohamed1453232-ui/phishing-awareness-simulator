import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Admin } from "../models/Admin";

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const dbPassword = process.env.PASSWORD;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    if (!dbPassword) {
      throw new Error("PASSWORD is not defined");
    }

    const connectionString = mongoUri.replace("<db_password>", dbPassword);
    await mongoose.connect(connectionString);

    const username = "admin";
    const password = "admin123@@";

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      username,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();
