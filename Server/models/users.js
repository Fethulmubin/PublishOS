import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    id: { type: String },
    bio: { type: String },
    avatar: { type: String },
    website: { type: String },
    location: { type: String },
    theme: { type: String, default: "light" },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      digestFrequency: { type: String, enum: ["daily", "weekly", "never"], default: "weekly" },
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
