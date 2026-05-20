import mongoose from "mongoose";

const socialAccountSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platform: { type: String, enum: ["linkedin", "twitter", "instagram", "facebook", "youtube"], required: true },
  platformUserId: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  tokenExpiresAt: { type: Date },
  profileData: {
    name: { type: String },
    avatar: { type: String },
    username: { type: String },
  },
  isConnected: { type: Boolean, default: false },
}, { timestamps: true });

socialAccountSchema.index({ userId: 1, platform: 1 }, { unique: true });

const SocialAccount = mongoose.model("SocialAccount", socialAccountSchema);

export default SocialAccount;
