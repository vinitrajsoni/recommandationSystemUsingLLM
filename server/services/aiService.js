import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "AI Product Recommender"
  }
});

export const getAIRecommendation = async (query, products) => {
  const productList = products
    .map((p) => `${p.name} - $${p.price}`)
    .join("\n");

  const prompt = `
User request: "${query}"

Available products:
${productList}

Return a JSON array of product names that match the request.
Only include names from the list.
No explanation.
Example: 
['iPhone 12', 'OnePlus 11']
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};