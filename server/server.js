import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendRoute from "./routes/recommend.js";

dotenv.config();

const app = express();

// ✅ CORS (allow Vercel frontend)
app.use(
  cors({
    origin: "https://recommandation-system-using-llm.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/recommend", recommendRoute);

// ✅ Test route (no more 404 on base URL)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ IMPORTANT (Render requires this)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
