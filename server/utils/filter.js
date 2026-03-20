export const filterProducts = (aiResponse, products, query) => {
  let names = [];

  try {
    names = JSON.parse(aiResponse);
  } catch {
    names = [];
  }

  query = query.toLowerCase();

  let minPrice = 0;
  let maxPrice = Infinity;

  const match = query.match(/\d+/);
  const price = match ? parseInt(match[0]) : null;

  if (price !== null) {
    if (query.includes("under") || query.includes("below")) {
      maxPrice = price;
    } else if (query.includes("above") || query.includes("over")) {
      minPrice = price;
    } else if (query.includes("at") || query.includes("around")) {
      minPrice = price - 100;
      maxPrice = price + 100;
    } else {
      maxPrice = price;
    }
  }

  // 🔥 STEP 1: AI filtered
  const aiFiltered = products.filter(
    (p) =>
      names.includes(p.name) &&
      p.price >= minPrice &&
      p.price <= maxPrice
  );

  // 🔥 STEP 2: Rule-based (guarantee completeness)
  const ruleFiltered = products.filter(
    (p) =>
      p.price >= minPrice &&
      p.price <= maxPrice
  );

  // 🔥 STEP 3: Merge (no duplicates)
  const combined = [
    ...aiFiltered,
    ...ruleFiltered.filter(
      (p) => !aiFiltered.some((a) => a.id === p.id)
    ),
  ];

  return combined;
};