export const fetchRecommendations = async (query) => {
  const res = await fetch(
    "https://recommandationsystemusingllm.onrender.com/api/recommend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
};
