import { createMemberService } from "../services/member.service.js";

export const createMember = async (req, res) => {
  try {
    const member = await createMemberService(req.body);

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    console.error("Create member error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create member",
    });
  }
};