import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './Contexts/CartContext';
import Navbar from './Components/Navbar';
import LoginSignup from './Components/LoginSignup';
import ForgotPassword from './Components/ForgotPassword';
import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

function App() {
  const token = localStorage.getItem("token");

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Redirect to dashboard if already logged in */}
          <Route
            path="/auth"
            element={token ? <Navigate to="/dashboard" /> : <LoginSignup />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
