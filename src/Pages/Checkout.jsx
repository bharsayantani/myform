import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Contexts/CartContext';
import { UserContext } from '../Contexts/UserContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  // Update name and email from user context when available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed!");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Checkout</h2>

      <h3>Cart Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} (x{item.quantity}) - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h4>Total: ${total.toFixed(2)}</h4>

      <h3>Billing & Shipping Info</h3>
      <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
        <div>
          <label>Name:</label><br />
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label><br />
          <input name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>City:</label><br />
          <input name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>ZIP:</label><br />
          <input name="zip" value={formData.zip} onChange={handleChange} required />
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
