import express from "express";
import { getAIRecommendation } from "../services/aiService.js";
import products from "../data/products.js";
import { filterProducts } from "../utils/filter.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    let aiResponse;

    try {
  aiResponse = await getAIRecommendation(query, products);
} catch (err) {
  console.log("AI ERROR:", err.message); // 👈 add this
  console.log("AI failed, using fallback");
  aiResponse = JSON.stringify(products.map((p) => p.name));
}

    const filteredProducts = filterProducts(aiResponse, products, query);

    res.json(filteredProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;