import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const limit = 10;
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    try {
      let url = `https://api.escuelajs.co/api/v1/products?offset=${reset ? 0 : offset}&limit=${limit}`;
      if (selectedCategory) {
        url = `https://api.escuelajs.co/api/v1/categories/${selectedCategory}/products?offset=${reset ? 0 : offset}&limit=${limit}`;
      }
      const res = await axios.get(url);
      const fetched = res.data;
      const newData = reset ? fetched : [...products, ...fetched];
      setProducts(newData);
      const newQuantities = {};
      newData.forEach(product => {
        newQuantities[product.id] = 1;
      });
      setQuantities(prev => ({ ...prev, ...newQuantities }));
      setOffset((prev) => reset ? limit : prev + limit);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0;
  });

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1, // ✅ required
      });
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>🛍️ Shop</h2>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <strong>Filter by Category:</strong>{" "}
        <button onClick={() => setSelectedCategory(null)}>All</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
            {cat.name}
          </button>
        ))}

        <div style={{ marginTop: '10px' }}>
          <label><strong>Sort by Price:</strong>{' '}</label>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="">-- Select --</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <strong>Cart Items:</strong> {cart.length}
      </div>

      {sortedProducts.length === 0 && !loading ? (
        <p style={{ textAlign: 'center' }}>No products found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {sortedProducts.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <div>
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  style={{ width: '60px' }}
                />
              </div>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/checkout', {
                  state: {
                    product: {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0]
                    }
                  }
                })}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => fetchProducts(false)} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Shop;
