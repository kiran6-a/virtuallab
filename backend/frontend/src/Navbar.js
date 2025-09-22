import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
        
      </div>
    </nav>
  );
}
