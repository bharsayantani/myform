import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [msg, setMsg] = useState('');
  const [step, setStep] = useState(1); // 1 = email check, 2 = reset form

  const handleEmailSubmit = async () => {
    setMsg('');
    try {
      const res = await axios.get("https://api.escuelajs.co/api/v1/users");
      const user = res.data.find(u => u.email === email);
      if (user) {
        setUserId(user.id);
        setStep(2); // proceed to password reset
      } else {
        setMsg("Email not found.");
      }
    } catch (err) {
      setMsg("Failed to fetch users.");
    }
  };

  const handleResetPassword = async () => {
    if (!userId) return;

    try {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${userId}`, {
        password: newPassword
      });
      setMsg("Password reset successfully!");
      setStep(1); // reset form
      setEmail('');
      setNewPassword('');
      setTimeout(() => {
      navigate("/", { state: { goToLogin: true } });// 🔁 Redirect to login page after 2 seconds
    }, 2000);
    
    } catch (err) {
      setMsg("Failed to reset password.");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSubmit}>Check Email</button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}

      {msg && <div style={{ color: "red", marginTop: "10px" }}>{msg}</div>}
    </div>
  );
};

export default ForgotPassword;
