import Member from "../models/member.model.js";
import User from "../models/user.model.js";

export const createMemberService = async (
  memberData,
  currentUserId,
  currentUserRole,
) => {
  const { userId } = memberData;

  // Check whether user exists
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (
  currentUserRole !== "admin" &&
  userId.toString() !== currentUserId.toString()
) {
  const error = new Error(
    "You are not allowed to create a member profile for this user"
  );
  error.statusCode = 403;
  throw error;
}

  // Check whether this user already has a member profile
  const existingMember = await Member.findOne({ userId });

  if (existingMember) {
    const error = new Error("This user already has a member profile");
    error.statusCode = 409;
    throw error;
  }

  // Create member
  const member = await Member.create(memberData);

  // Populate user information
  await member.populate("userId", "firstName lastName email role");

  return member;
};

export const getAllMembersService = async (
  page = 1,
  limit = 10,
  search,
  gender,
  ministry,
  membershipStatus,
  isActive,
) => {
  const skip = (page - 1) * limit;

  let userIds = [];

  if (search) {
    const users = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("_id");

    userIds = users.map((user) => user._id);
  }

  const filter = {};

  if (search) {
    filter.userId = { $in: userIds };
  }
  if (gender) {
    filter.gender = gender;
  }
  if (ministry) {
    filter.ministry = ministry;
  }

  if (membershipStatus) {
    filter.membershipStatus = membershipStatus;
  }
  if (isActive !== undefined) {
    filter.isActive = isActive;
  }

  const members = await Member.find(filter)
    .populate("userId", "firstName lastName email role")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalMembers = await Member.countDocuments(filter);

  const totalPages = Math.ceil(totalMembers / limit);

  return {
    members,
    pagination: {
      page,
      limit,
      totalMembers,
      totalPages,
    },
  };
};
export const getMemberByIdService = async (memberId) => {
  const member = await Member.findById(memberId).populate(
    "userId",
    "firstName lastName email role",
  );

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
  currentUserRole,
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
    const error = new Error("You are not allowed to update this member");
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
      const error = new Error("Date of birth cannot be in the future");
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
  await member.populate("userId", "firstName lastName email role");

  return member;
};
export const deactivateMemberService = async (memberId) => {
  const member = await Member.findById(memberId);

  if (!member) {
    const error = new Error("Member not found");
    error.statusCode = 404;
    throw error;
  }

  if (!member.isActive) {
    const error = new Error("Member is already inactive");
    error.statusCode = 400;
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
    const error = new Error("Member not found");
    error.statusCode = 404;
    throw error;
  }

  if (member.isActive) {
    const error = new Error("Member is already active");
    error.statusCode = 400;
    throw error;
  }

  member.isActive = true;
  member.membershipStatus = "active";

  await member.save();

  return member;
};
