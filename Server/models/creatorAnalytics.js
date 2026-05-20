import mongoose from "mongoose";

const creatorAnalyticsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  metrics: {
    totalPosts: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    newFollowers: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
  },
  platformBreakdown: {
    linkedin: { likes: Number, comments: Number, shares: Number, impressions: Number },
    twitter: { likes: Number, retweets: Number, replies: Number, impressions: Number },
    instagram: { likes: Number, comments: Number, shares: Number, reach: Number },
    facebook: { reactions: Number, comments: Number, shares: Number, reach: Number },
  },
}, { timestamps: true });

creatorAnalyticsSchema.index({ userId: 1, date: -1 });

const CreatorAnalytics = mongoose.model("CreatorAnalytics", creatorAnalyticsSchema);

export default CreatorAnalytics;
