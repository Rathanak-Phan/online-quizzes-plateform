import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModels } from "../models/userModels.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await userModels.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModels.create(name, email, hashedPassword, role);

    res.status(201).json({ message: "Registration successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.findByEmail(email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
