const Recommendations = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No recommendations found</p>;
  }

  return (
    <div>
      <h3 className="section-title">Recommended Products</h3>

      {products.map((p) => (
        <div className="product-card recommended" key={p.id}>
          <h4>{p.name}</h4>
          <p className="price">Price: ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;