import {
  activateMemberService,
  createMemberService,
  deactivateMemberService,
  getAllMembersService,
  getMemberByIdService,
  updateMemberService,
} from "../services/member.service.js";

export const createMember = async (req, res) => {
  try {
    const member = await createMemberService(
  req.body,
  req.user.userId,
  req.user.role
);

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

export const getAllMembers = async (req, res) => {
  try {
    const page = req.query.page === undefined ? 1 : Number(req.query.page);

    const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

    const search = req.query.search?.trim();

    const gender = req.query.gender;

    const ministry = req.query.ministry;

    const membershipStatus = req.query.membershipStatus;

    const isActive =
      req.query.isActive !== undefined
        ? req.query.isActive === "true"
        : undefined;

    // Your existing page validation
    if (!Number.isInteger(page) || page < 1) {
      const error = new Error("Page must be a positive integer");
      error.statusCode = 400;
      throw error;
    }

    // Your existing limit validation
    if (!Number.isInteger(limit) || limit < 1) {
      const error = new Error("Limit must be a positive integer");
      error.statusCode = 400;
      throw error;
    }

    if (limit > 100) {
      const error = new Error("Limit cannot exceed 100");
      error.statusCode = 400;
      throw error;
    }

    const result = await getAllMembersService(
      page,
      limit,
      search,
      gender,
      ministry,
      membershipStatus,
      isActive,
    );

    return res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: result.members,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get all members error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve members",
    });
  }
};
export const getMemberById = async (req, res) => {
  try {
    const member = await getMemberByIdService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Member retrieved successfully",
      data: member,
    });
  } catch (error) {
    console.error("Get member by ID error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve member",
    });
  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await updateMemberService(
      req.params.id,
      req.body,
      req.user.userId,
      req.user.role,
    );

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    console.error("Update member error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update member",
    });
  }
};

export const deactivateMember = async (req, res) => {
  try {
    const member = await deactivateMemberService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Member deactivated successfully",
      data: member,
    });
  } catch (error) {
    console.error("Deactivate member error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to deactivate member",
    });
  }
};

export const activateMember = async (req, res) => {
  try {
    const member = await activateMemberService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Member activated successfully",
      data: member,
    });
  } catch (error) {
    console.error("Activate member error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to activate member",
    });
  }
};
