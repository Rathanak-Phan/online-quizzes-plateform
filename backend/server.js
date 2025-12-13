import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome to my data from backend");
});

// Add your auth routes
app.use("/api", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
