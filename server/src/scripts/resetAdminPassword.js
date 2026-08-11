import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/user.model.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    const admin = await User.findOne({
      email: "admin@gcms.com",
    });

    if (!admin) {
      console.log("Admin account not found");
      await mongoose.disconnect();
      return;
    }

    admin.password = process.env.ADMIN_PASSWORD;

    await admin.save();

    console.log("Admin password reset successfully");

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Failed to reset admin password:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

resetAdminPassword();