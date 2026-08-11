import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateAccessToken } from "../utils/jwt.js";

export const registerUserService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  return user;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  // console.log("Login email:", email);
  // console.log("User found:", !!user);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  console.log("Password valid:", isPasswordValid);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);

  return {
    user,
    accessToken,
  };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  return user;
};