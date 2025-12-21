import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModels } from "../models/userModels.js";

// Register any user
export const register = async (req, res) => {
  const { name, email, password, role = "student" } = req.body;

  try {
    const existingUser = await userModels.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModels.create(name, email, hashedPassword, role);

    res.status(201).json({
      message: "Account created successfully!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// General login (any role)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.findByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin-only login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.findByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied: not an admin" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
