  import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateAccessToken } from "../utils/jwt.js";

  export const registerUserService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {

  
  if (!firstName || !firstName.trim()) {
    const error = new Error("First name is required");
    error.statusCode = 400;
    throw error;
  }

  if (!lastName || !lastName.trim()) {
    const error = new Error("Last name is required");
    error.statusCode = 400;
    throw error;
  }

  firstName = firstName.trim();
  lastName = lastName.trim();

  // Your existing email/password validation continues here...
  // Normalize input
  email = email.trim().toLowerCase();

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 400;
    throw error;
  }

  // Validate password length
  if (password.length < 8) {
    const error = new Error(
      "Password must be at least 8 characters long"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validate uppercase
  if (!/[A-Z]/.test(password)) {
    const error = new Error(
      "Password must contain at least one uppercase letter"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validate lowercase
  if (!/[a-z]/.test(password)) {
    const error = new Error(
      "Password must contain at least one lowercase letter"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validate number
  if (!/[0-9]/.test(password)) {
    const error = new Error(
      "Password must contain at least one number"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validate special character
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\\\/]/.test(password)) {
    const error = new Error(
      "Password must contain at least one special character"
    );
    error.statusCode = 400;
    throw error;
  }

  // Check duplicate email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  // Create user
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

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
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