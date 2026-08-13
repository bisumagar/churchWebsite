import { activateMemberService, createMemberService, deactivateMemberService, getAllMembersService, getMemberByIdService, updateMemberService } from "../services/member.service.js";

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

export const getAllMembers = async (req, res) => {
  try{
    const members = await getAllMembersService();
    return res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: members,
    });
  } catch (error) {
    console.error("Get all members error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve members",   
      
    })
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
}

 export const updateMember = async (req, res) => {
  try {
    const member = await updateMemberService(
      req.params.id,
      req.body,
      req.user.userId,
      req.user.role
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
  