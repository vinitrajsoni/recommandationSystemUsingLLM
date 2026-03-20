import { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Recommendations from "./components/Recommendations";
import { fetchRecommendations } from "./api/api";

const initialProducts = [
  { id: 1, name: "iPhone 12", price: 499 },
  { id: 2, name: "Samsung Galaxy S21", price: 450 },
  { id: 3, name: "OnePlus 11", price: 700 },
  { id: 4, name: "Pixel 6a", price: 350 },
];

function App() {
  const [products] = useState(initialProducts);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await fetchRecommendations(query);
      setRecommended(data);
    } catch (err) {
      console.error(err);
      setRecommended([]);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">AI Product Recommendation System</h2>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Loading...</p>}

      <ProductList products={products} />

      <div className="divider"></div>

      <Recommendations products={recommended} />
    </div>
  );
}

export default App;