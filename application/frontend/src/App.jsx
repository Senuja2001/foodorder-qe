import { useEffect, useState } from "react";
import api from "./services/api";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category_id === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>FoodOrder</h1>
          <p>Fresh food, delivered simply.</p>
        </div>

        <div className="cart" data-testid="cart">
          🛒 Cart
          <span data-testid="cart-count">
            {cartCount}
          </span>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Explore Our Menu</h2>
          <p>Choose from our freshly prepared food and drinks.</p>
        </section>

        {/* Search */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="product-search"
          />
        </div>

        {/* Categories */}
        <div className="category-section">
          <button
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
            data-testid="category-all"
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={
                selectedCategory === category.id ? "active" : ""
              }
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`category-${category.id}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading && (
          <p data-testid="loading-message">
            Loading products...
          </p>
        )}

        {error && (
          <div
            className="error-message"
            data-testid="error-message"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="results-count">
              {filteredProducts.length} product(s) found
            </p>

            <div
              className="product-grid"
              data-testid="product-grid"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p
                className="no-results"
                data-testid="no-results"
              >
                No products found.
              </p>
            )}

            {cart.length > 0 && (
              <section
                className="cart-summary"
                data-testid="cart-summary"
              >
                <h2>Your Cart</h2>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>

                      <strong>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </strong>
                    </div>

                    <div className="cart-controls">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        data-testid={`decrease-${item.id}`}
                      >
                        −
                      </button>

                      <span data-testid={`quantity-${item.id}`}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        data-testid={`increase-${item.id}`}
                      >
                        +
                      </button>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                        data-testid={`remove-${item.id}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-total">
                  <strong>Total</strong>
                  <strong data-testid="cart-total">
                    ${cartTotal.toFixed(2)}
                  </strong>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;