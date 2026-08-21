function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        🍽️
      </div>

      <div className="product-info">
        <span className="category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <strong>${product.price}</strong>

          <button
            className="add-button"
            data-testid={`add-product-${product.id}`}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;