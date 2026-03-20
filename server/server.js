import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendRoute from "./routes/recommend.js";

dotenv.config();

const app = express();

// ✅ FIXED CORS (allow your Vercel frontend)
app.use(
  cors({
    origin: "https://recommandation-system-using-llm.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ ROUTE (already correct)
app.use("/api/recommend", recommendRoute);

// ✅ OPTIONAL (avoid 404 on base URL)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ FIXED PORT (CRITICAL for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
