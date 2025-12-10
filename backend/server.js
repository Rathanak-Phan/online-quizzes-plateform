import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());



app.get("/api", (req, res) => {
  res.send("Welcome to my backend");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
