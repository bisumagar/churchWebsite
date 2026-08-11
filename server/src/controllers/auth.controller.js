import {
  getCurrentUserService,
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
   
    console.log("REQ BODY:", req.body);

    
    const user = await registerUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
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
    console.error("Registration error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the user",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const {user, accessToken} = await loginUserService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong while logging in",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await getCurrentUserService(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Authenticated user",
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
    console.error("Get current user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const adminTest = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the admin area",
    data: {
      userId: req.user.userId,
      role: req.user.role,
    },
  });
};