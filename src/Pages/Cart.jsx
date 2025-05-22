import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // 🧮 Calculate the total cart price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'white' }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #ddd',
                  padding: '10px 0',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    marginRight: '20px',
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4>{item.title}</h4>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <div>
                    Quantity:{' '}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      style={{ width: '60px', marginLeft: '10px' }}
                    />
                  </div>
                  <p><strong>Subtotal:</strong> ${itemTotal.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            );
          })}

          <h3>Total: ${total.toFixed(2)}</h3>

          <div style={{ marginTop: '20px' }}>
            <button onClick={clearCart} style={{ marginRight: '10px' }}>
              Clear Cart
            </button>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
