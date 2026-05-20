import mongoose from "mongoose";

const aiHistorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  input: { type: String },
  output: { type: String },
  provider: { type: String, default: "openai" },
  model: { type: String },
  tokensUsed: { type: Number },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const AIHistory = mongoose.model("AIHistory", aiHistorySchema);

export default AIHistory;
