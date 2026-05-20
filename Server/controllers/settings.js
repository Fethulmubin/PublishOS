import userModel from "../models/users.js";
import bcrypt from "bcrypt";

const getSettings = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { name, email, bio, avatar, website, location, preferences } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { name, email, bio, avatar, website, location, preferences },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Current password is incorrect." });

    if (newPassword.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateThemePreference = async (req, res) => {
  try {
    const { theme } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { theme },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getSettings, updateSettings, changePassword, updateThemePreference };
