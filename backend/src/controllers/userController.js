import { userModels } from "../models/userModels.js";
import multer from "multer";
import path from "path";

// Store uploaded files in "uploads/profile" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads/profile"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// Controller
export const uploadProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const imagePath = `/uploads/profile/${req.file.filename}`;
    const updatedUser = await userModels.updateProfileImage(userId, imagePath);

    res.json({ message: "Profile image updated", image: imagePath, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
