import React, { useEffect, useState , useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Contexts/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
 const { cart, addToCart } = useContext(CartContext);;

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'white' }}>
      <h2>Shop</h2>
    {/* 🛒 Cart Summary */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
      <p><strong>Cart Items:</strong> {cart.length}</p>
      </div>

      {/* 🛍️ Product List */}
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <button onClick={() => addToCart({  id: product.id,  title: product.title,  price: product.price,  image: product.images[0] // ✅ save image
})}>
  Add to Cart
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop; 
