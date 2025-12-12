import express, { json } from "express";
import { register, login } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

// Protected example route
router.get("/auth/me", auth, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

export default router;
