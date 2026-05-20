import mongoose from "mongoose";

const scheduledPostSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  platforms: [{ type: String, enum: ["linkedin", "twitter", "instagram", "facebook", "youtube"] }],
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "published", "failed", "draft"], default: "draft" },
  mediaUrls: [{ type: String }],
  publishedAt: { type: Date },
  errorMessage: { type: String },
}, { timestamps: true });

const ScheduledPost = mongoose.model("ScheduledPost", scheduledPostSchema);

export default ScheduledPost;
