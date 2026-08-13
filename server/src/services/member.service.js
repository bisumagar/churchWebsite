import Member from "../models/member.model.js";

export const createMemberService = async (memberData) => {
  const member = await Member.create(memberData);

  return member;
};

export const getAllMembersService  = async () => {

  const members = await Member.find()
  .populate("userId","firstName lastName email role")
  .sort({ createdAt: -1 });
  return members;
};

export const getMemberByIdService = async (memberId) => {
  
  const member = await Member.findById(memberId)
  .populate("userId","firstName lastName email role");

  if (!member) {
    const error = new Error("Member not found");
    error.statusCode = 404;
    throw error;
  }

  return member;
};
export const updateMemberService = async (
  memberId,
  updateData,
  currentUserId,
  currentUserRole
) => {
  const member = await Member.findById(memberId);

  if (!member) {
    const error = new Error("Member not found");
    error.statusCode = 404;
    throw error;
  }

  // Authorization
  if (
    currentUserRole !== "admin" &&
    member.userId.toString() !== currentUserId.toString()
  ) {
    const error = new Error(
      "You are not allowed to update this member"
    );
    error.statusCode = 403;
    throw error;
  }

  // Validate phone
  if (updateData.phone !== undefined) {
    const phoneRegex = /^(97|98)\d{8}$/;

    if (!phoneRegex.test(updateData.phone)) {
      const error = new Error("Invalid phone number");
      error.statusCode = 400;
      throw error;
    }
  }

  // Validate date of birth
  if (updateData.dateOfBirth !== undefined) {
    const dateOfBirth = new Date(updateData.dateOfBirth);

    if (Number.isNaN(dateOfBirth.getTime())) {
      const error = new Error("Invalid date of birth");
      error.statusCode = 400;
      throw error;
    }

    if (dateOfBirth > new Date()) {
      const error = new Error(
        "Date of birth cannot be in the future"
      );
      error.statusCode = 400;
      throw error;
    }
  }

  // Allowed fields
  const allowedFields = [
    "dateOfBirth",
    "gender",
    "phone",
    "address",
    "ministry",
    "emergencyContact",
  ];

  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  // Update member
  Object.assign(member, filteredData);

  // Save
  await member.save();

  // Populate user
  await member.populate(
    "userId",
    "firstName lastName email role"
  );

  return member;
};
export const deactivateMemberService = async (memberId) => {

  const member = await Member.findById(memberId);

  if (!member) {
    const error = new Error("Member not found");
    error.statusCode = 404;
    throw error;
  }

  member.isActive = false;
  member.membershipStatus = "inactive";
  await member.save();

  return member;

};


export const activateMemberService = async (memberId) => {

  const member = await Member.findById(memberId);

  if (!member) {
    const error = new Error ("Member not found");
    error.statusCode = 404;
    throw error;  
  }
  member.isActive = true;
  member.membershipStatus = "active";
  await member.save();

  return member;
}   