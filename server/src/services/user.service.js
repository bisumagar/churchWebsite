import User from "../models/user.model.js";


export const getAllUsersService = async () => {

    const users = await User.find().select("-password")
                            .sort({ createdAt: -1 });

    return users;
};

export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId).select("-password");


    if(!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;    
    }
    return user;
}

export const updateUserService = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
  "firstName",
  "lastName",
  "email",
  "password",
];

const hasUpdate = allowedFields.some(
  (field) => updateData[field] !== undefined
);

if (!hasUpdate) {
  const error = new Error("No fields provided for update");
  error.statusCode = 400;
  throw error;
}

  // Validate first name if provided
  if (updateData.firstName !== undefined) {
    if (!updateData.firstName.trim()) {
      const error = new Error("First name cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    user.firstName = updateData.firstName.trim();
  }

  // Validate last name if provided
  if (updateData.lastName !== undefined) {
    if (!updateData.lastName.trim()) {
      const error = new Error("Last name cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    user.lastName = updateData.lastName.trim();
  }

  // Validate email if provided
  if (updateData.email !== undefined) {
    const email = updateData.email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    // Check whether another user already uses this email
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      const error = new Error("Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    user.email = email;
  }

  // Validate password if provided
  if (updateData.password !== undefined) {
    const password = updateData.password;

    if (password.length < 8) {
      const error = new Error(
        "Password must be at least 8 characters long"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!/[A-Z]/.test(password)) {
      const error = new Error(
        "Password must contain at least one uppercase letter"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!/[a-z]/.test(password)) {
      const error = new Error(
        "Password must contain at least one lowercase letter"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!/[0-9]/.test(password)) {
      const error = new Error(
        "Password must contain at least one number"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\\\/]/.test(password)) {
      const error = new Error(
        "Password must contain at least one special character"
      );
      error.statusCode = 400;
      throw error;
    }

    user.password = password;
  }

  await user.save();

  return user;
};

export const deactivateUserService = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    
    if (!user.isActive) {
        const error = new Error("User account is already inactive");
        error.statusCode = 400;
        throw error;
    }

    user.isActive = false;
    await user.save();

    return user;
}

export const activateUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.isActive) {
    const error = new Error("User is already active");
    error.statusCode = 400;
    throw error;
  }

  user.isActive = true;

  await user.save();

  return user;
};

export const updateUserRoleService = async (userId, role) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedRoles = ["member", "admin"];

  if (!allowedRoles.includes(role)) {
    const error = new Error("Invalid role");
    error.statusCode = 400;
    throw error;
  }

  if (user.role === role) {
    const error = new Error(`User is already ${role}`);
    error.statusCode = 400;
    throw error;
  }

  user.role = role;

  await user.save();

  return user;
};