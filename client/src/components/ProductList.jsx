const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div>
      <h3 className="section-title">All Products</h3>

      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <h4>{p.name}</h4>
          <p className="price">Price: ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;