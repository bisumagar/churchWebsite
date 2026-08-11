import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

   const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      await mongoose.disconnect();
      return;
    }

    const admin = await User.create({
      firstName: "GCMS",
      lastName: "Admin",
      email,
      password,
      role: "admin",
      isVerified: true,
      isActive: true,
    });

    console.log("Admin created successfully");
    console.log("Email:", admin.email);

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Failed to create admin:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();