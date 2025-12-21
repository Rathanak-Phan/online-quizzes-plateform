import express from "express";
import { register, loginUser, adminLogin } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/requireRole.js";
import { upload, uploadProfile } from "../controllers/userController.js";

const router = express.Router();

// Register any user
router.post("/auth/register", register);

// General login (any role)
router.post("/auth/login", loginUser);

// Admin-only login
router.post("/auth/admin/login", adminLogin);

// Example protected route (any logged-in user)
router.get("/auth/me", auth, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

// POST upload profile
router.post("/users/upload-profile/:id", upload.single("profile"), uploadProfile);

// Example admin-only protected route
router.get(
  "/admin",
  auth,
  requireRole(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome to admin dashboard" });
  }
);

export default router;
