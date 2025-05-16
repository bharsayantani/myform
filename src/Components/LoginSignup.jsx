import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
//import './LoginSignup.css';
import '../Public/Assets/LoginSignup.css'

const LoginSignup = () => {

  const location = useLocation();
  const [action, setAction] = useState(location.state?.goToLogin ? "Login" : "Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // 🔹 Add this
  
  

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
        setMsg("User created successfully!");
      } catch (err) {
        setMsg(err.response?.data?.message || "Sign up failed");
      }
    } else {
      try {
        const res = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
          email,
          password
        });

        // Optional: Store token
        localStorage.setItem("token", res.data.access_token);

        // 🔹 Navigate to dashboard
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
