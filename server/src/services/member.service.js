import Member from "../models/member.model.js";

export const createMemberService = async (memberData) => {
  const member = await Member.create(memberData);

  return member;
};