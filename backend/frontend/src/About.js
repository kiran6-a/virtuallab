import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <h2 className="about-title">ℹ️ About Us</h2>
      <p className="about-subtitle">
        Welcome to the Virtual Physics Lab project! This platform is designed to help
        students explore and understand physics concepts through interactive 3D simulations.
      </p>

      <div className="about-section">
        <h3>📍 Contact Information</h3>
        <p><b>Phone:</b> 7337792139</p>
        <p><b>Email:</b> <a href="mailto:hbkiran888@gmail.com">hbkiran888@gmail.com</a></p>
        <p>
          <b>Address:</b> East Point College of Higher Education,  
          No.147, Bidarahalli, Virgonagar Post, Bangalore
        </p>
      </div>

      <div className="about-section">
        <h3>🎯 Our Mission</h3>
        <p>
          To make physics learning more engaging and accessible through immersive
          virtual experiments. Our goal is to empower students to visualize,
          interact, and learn core scientific concepts beyond traditional classrooms.
        </p>
      </div>

      <div className="about-section">
        <h3>💡 Future Vision</h3>
        <p>
          We aim to integrate AI tutors, VR/AR technologies, and advanced data
          analytics to create a next-generation educational platform that adapts
          to each student’s learning pace and style.
        </p>
      </div>
    </div>
  );
}
