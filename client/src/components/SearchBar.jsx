import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="e.g. phone under $500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="search-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;