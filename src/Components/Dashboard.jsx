import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'white' }}>
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
