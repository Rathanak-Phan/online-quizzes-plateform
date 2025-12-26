import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import path from "path";

dotenv.config();
const app = express();

// -----------------------------
// CORS Setup
// -----------------------------
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.get("/api", (req, res) => {
  res.send("Welcome to my backend!");
});

app.use("/api", authRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

// DB test route
app.get("/db-user-test", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT current_user, session_user, current_database();"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
