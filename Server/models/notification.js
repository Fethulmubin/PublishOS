import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["publishing", "ai_suggestion", "reminder", "system", "engagement", "alert"], required: true },
  title: { type: String, required: true },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  link: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
