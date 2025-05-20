import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '10px' }}>About</Link>
      <Link to="/shop" style={{ marginRight: '10px' }}>Shop</Link>
      <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
      <Link to="/checkout" style={{ marginRight: '10px' }}>Checkout</Link>

      {token ? (
        <>
          <Link to="/dashboard" style={{ marginLeft: '10px' }}>Dashboard</Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            style={{ marginLeft: '10px' }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/auth" style={{ marginLeft: '10px' }}>Login / Sign Up</Link>
      )}
    </nav>
  );
};

export default Navbar;
