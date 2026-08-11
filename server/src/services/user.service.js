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

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      user[field] = updateData[field];
    }
  });

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