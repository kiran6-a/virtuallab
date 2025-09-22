import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-page">
      <h2 className="help-title">❓ Help & User Guide</h2>
      <p className="help-subtitle">
        Follow this guide to use the Virtual Physics Lab experiments correctly.
      </p>

      <div className="help-section">
        <h3>1. Getting Started</h3>
        <p>
          Navigate to the <b>Home</b> page and choose an experiment card 
          (Projectile, Pendulum, Lens, Wave, Spring-Mass). Each experiment opens 
          in an interactive 3D view.
        </p>
      </div>

      <div className="help-section">
        <h3>2. Controls</h3>
        <p>
          Use the sliders on the left/top of each experiment to adjust variables 
          like velocity, angle, length, focal length, wave speed, or spring constant. 
          The 3D scene will update instantly to show the effect of your changes.
        </p>
      </div>

      <div className="help-section">
        <h3>3. Camera & Navigation</h3>
        <p>
          Drag with your mouse to rotate the 3D view. Use your mouse wheel to zoom in/out. 
          Hold right-click (or two-finger drag) to pan around the scene.
        </p>
      </div>

      <div className="help-section">
        <h3>4. Formulas & Explanations</h3>
        <p>
          Below each experiment, you will find the key formulas used in the simulation. 
          Click <b>"Show Explanation"</b> to read detailed theory about the experiment.
        </p>
      </div>

      <div className="help-section">
        <h3>5. Q&A and Theory</h3>
        <p>
          Use the <b>Q&A page</b> to review common questions and answers. 
          The <b>Theory page</b> provides deeper explanations and real-life examples 
          for each experiment.
        </p>
      </div>

      <div className="help-section">
        <h3>6. Quiz</h3>
        <p>
        <b>Quiz page</b> to attend Quiz test. 
        </p>
      </div>

      <div className="help-section">
        <h3>7. Certificate</h3>
        <p>
        <b>Certificate</b> after compleation of quiz and experiments you can print certificate. 
        </p>
      </div>

      <div className="help-section">
        <h3>8. Tips</h3>
        <ul>
          <li>Use smaller steps on sliders for precise adjustments.</li>
          <li>Reset values by dragging sliders back to default positions.</li>
          <li>For the best experience, view on desktop or laptop (Chrome/Edge/Firefox).</li>
        </ul>
      </div>
    </div>
  );
}
