import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import About from "../Pages/About";
import Shop from "../Pages/Shop";

const Dashboard = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'white' }}>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="about" style={{ marginRight: "20px" }}>About</Link>
        <Link to="shop">Shop</Link>
      </nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="shop" element={<Shop />} />
        </Routes>
      </div>
    
    
      <h1>Welcome to Dashboard</h1>
      <p>You are now logged in!</p>
      <div className="submit-button-logout">
        <button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
            }}>
            Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
