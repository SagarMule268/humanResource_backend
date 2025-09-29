import User from "../models/User.js";
import bcrypt from "bcrypt";

const updatePassword = async (req, res) => {
  try {
    const { userId, old_password, new_password } = req.body;
       
    if (!userId || !old_password || !new_password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    const isMatched = await bcrypt.compare(old_password, user.password);
    if (!isMatched) {
      return res.status(400).json({ success: false, error: "Old password is incorrect" });
    }

    const hashPassword = await bcrypt.hash(new_password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { updatePassword };
