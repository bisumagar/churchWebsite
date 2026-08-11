import { activateUserService, deactivateUserService, getAllUsersService, getUserByIdService, updateUserRoleService, updateUserService } from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong while retrieving users",
        });
    }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update user",
    });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const user = await deactivateUserService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Deactivate user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to deactivate user",
    });
  }
};

export const activateUser = async (req, res) => {
  try {
    const user = await activateUserService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User activated successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Activate user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to activate user",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await updateUserRoleService(
      req.params.id,
      req.body.role
    );

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Update user role error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update user role",
    });
  }
};