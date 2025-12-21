import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import path from "path";

dotenv.config();
const app = express();

// CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_VITE,
  process.env.FRONTEND_URL_PROD
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

// Root test route
app.get("/api", (req, res) => {
  res.send("Welcome to my backend!");
});

// Auth routes
app.use("/api", authRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

// DB test route
app.get("/db-user-test", async (req, res) => {
  try {
    const result = await db.query("SELECT current_user, session_user, current_database();");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
