import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    // Optionally redirect to home page
    window.location.href = "/home";
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">⚡ Virtual Lab</span>
      </div>

      <div className="nav-right">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/qa" className="nav-link">Q&A</Link>
        <Link to="/theory" className="nav-link">Theory</Link>
        <Link to="/quiz" className="nav-link">Quiz</Link>
        <Link to="/certificate" className="nav-link">Certificate</Link>
        <Link to="/help" className="nav-link">Help</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        
        {/* Authentication Links */}
        {isLoggedIn ? (
          <div className="auth-section">
            <Link to="/profile" className="nav-link profile-link">👤 Profile</Link>
            <span className="user-welcome">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-section">
            <Link to="/login" className="nav-link login-link">Login</Link>
            <Link to="/register" className="nav-link register-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
