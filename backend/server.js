import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

// Dynamic CORS
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origin === FRONTEND_URL) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  }
}));

// Parse JSON
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.send("Welcome to my backend!");
});

// Auth routes
app.use("/api", authRoutes);

// Dynamic port for local or Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
