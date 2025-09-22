import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";

// Pages
import Home from "./Home";
import QA from "./QA";
import Theory from "./Theory";
import Help from "./Help";
import About from "./About";
import Quiz from "./Quiz";
import Certificate from "./Certificate";

// Experiments
import Projectile3D from "./Projectile3D";
import Pendulum3D from "./Pendulum3D";
import Lens3D from "./Lens3D";
import Wave3D from "./Wave3D";
import SpringMass3D from "./SpringMass3D";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/certificate" element={<Certificate />} />

        {/* Experiments */}
        <Route path="/projectile3d" element={<Projectile3D />} />
        <Route path="/pendulum3d" element={<Pendulum3D />} />
        <Route path="/lens" element={<Lens3D />} />
        <Route path="/wave" element={<Wave3D />} />
        <Route path="/spring" element={<SpringMass3D />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
