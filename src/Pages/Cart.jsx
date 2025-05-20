// src/Pages/Cart.jsx

import React, { useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
   <div style={{ paddingLeft: '50px', marginTop: '50px', backgroundColor: 'white' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              {/* ✅ Show product image */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
              />
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
