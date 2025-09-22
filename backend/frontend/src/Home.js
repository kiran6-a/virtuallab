import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">⚡ Welcome to Virtual Physics Lab</h1>
      <p className="home-subtitle">
        Explore physics concepts with interactive 3D experiments.
      </p>

      <div className="home-buttons">
        <Link to="/projectile3d" className="home-btn">
          🎯 Projectile Motion
        </Link>
        <Link to="/pendulum3d" className="home-btn">
          ⏳ Pendulum
        </Link>
        <Link to="/lens" className="home-btn">
          🔍 Lens Simulation
        </Link>
        <Link to="/wave" className="home-btn">
          🌊 Wave Simulation
        </Link>
        <Link to="/spring" className="home-btn">
          🌀 Spring-Mass
        </Link>
      </div>
    </div>
  );
}
