import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext'; // ✅ Import user context

import '../Public/Assets/LoginSignup.css';

const LoginSignup = () => {
  const location = useLocation();
  const [action, setAction] = useState(location.state?.goToLogin ? "Login" : "Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext); // ✅ Use context

  const handleSubmit = async () => {
    setMsg("");

    if (action === "Sign Up") {
      try {
        await axios.post("https://api.escuelajs.co/api/v1/users", { 
          name,
          email,
          password,
          avatar: "https://api.lorem.space/image/face?w=150&h=150"
        });
        setMsg("User created successfully! You can now login.");
        setAction("Login");
      } catch (err) {
        setMsg(err.response?.data?.message || "Sign up failed");
      }
    } else {
      try {
        // Step 1: Login
        const res = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
          email,
          password
        });

        const token = res.data.access_token;
        localStorage.setItem("token", token);

        // Step 2: Fetch user profile
        const userRes = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = {
          name: userRes.data.name,
          email: userRes.data.email
        };

        // Step 3: Store in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Step 4: Update UserContext (optional but helpful)
        setUser(userData);

        // Step 5: Navigate to dashboard
        navigate("/dashboard");

      } catch (err) {
        setMsg(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-button">
        <button onClick={handleSubmit}>{action}</button>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          <span onClick={() => navigate("/forgot-password")} style={{ color: "blue", cursor: "pointer" }}>
            Forgot Password?
          </span>
        </div>
      )}

      <div className="switch-action" style={{ marginTop: '15px', textAlign: 'center' }}>
        {action === "Login" ? (
          <p>Don't have an account? <span onClick={() => setAction("Sign Up")} style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setAction("Login")} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
        )}
      </div>

      <div style={{ color: "red", marginTop: "10px" }}>{msg}</div>
    </div>
  );
};

export default LoginSignup;
