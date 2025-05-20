import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to your Dashboard</h1>

       <button onClick={handleLogout} style={{ marginTop: "30px" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
