import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    membershipStatus: {
      type: String,
      enum: ["active", "inactive", "transferred", "deceased"],
      default: "active",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },

    ministry: {
      type: String,
      trim: true,
    },

    emergencyContact: {
      name: {
        type: String,
        trim: true,
      },

      relationship: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
