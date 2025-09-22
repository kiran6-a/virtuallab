import React from "react";
import "./QA.css";

export default function QA() {
  return (
    <div className="qa-page">
      <h2 className="qa-title">📘 Physics Lab Q&A</h2>
      <p className="qa-subtitle">Review questions and answers for each experiment.</p>

      {/* Projectile Motion */}
      <div className="qa-section">
        <h3>🎯 Projectile Motion (3D)</h3>
        <ul>
          <li><b>Q:</b> What is the formula for range? <br /><b>A:</b> R = (u² · sin(2θ)) / g</li>
          <li><b>Q:</b> At what angle is range maximum? <br /><b>A:</b> 45° (without air resistance).</li>
          <li><b>Q:</b> What factors affect time of flight? <br /><b>A:</b> Initial velocity and angle of projection.</li>
          <li><b>Q:</b> Does mass of projectile affect trajectory? <br /><b>A:</b> No, neglecting air resistance.</li>
          <li><b>Q:</b> What shape does the path follow? <br /><b>A:</b> A parabola.</li>
        </ul>
      </div>

      {/* Pendulum */}
      <div className="qa-section">
        <h3>⏳ Pendulum (3D)</h3>
        <ul>
          <li><b>Q:</b> What is the formula for period? <br /><b>A:</b> T = 2π √(L/g)</li>
          <li><b>Q:</b> Does mass of the bob affect the period? <br /><b>A:</b> No, period depends only on L and g.</li>
          <li><b>Q:</b> What assumption is used in derivation? <br /><b>A:</b> Small-angle approximation (θ ≤ 10°).</li>
          <li><b>Q:</b> How does increasing length affect period? <br /><b>A:</b> Increases period (slower swings).</li>
          <li><b>Q:</b> What happens if amplitude is large? <br /><b>A:</b> The small-angle approximation fails.</li>
        </ul>
      </div>

      {/* Lens */}
      <div className="qa-section">
        <h3>🔍 Lens Simulation (3D)</h3>
        <ul>
          <li><b>Q:</b> What is the lens formula? <br /><b>A:</b> 1/f = 1/v + 1/u</li>
          <li><b>Q:</b> When is the image real? <br /><b>A:</b> When v &gt; 0 (image forms on the right side).</li>
          <li><b>Q:</b> What is magnification formula? <br /><b>A:</b> M = v/u</li>
          <li><b>Q:</b> What happens if object is at 2f? <br /><b>A:</b> Image is at 2f, same size, inverted.</li>
          <li><b>Q:</b> What happens if object is within focal length? <br /><b>A:</b> A virtual, erect, magnified image is formed.</li>
        </ul>
      </div>

      {/* Wave */}
      <div className="qa-section">
        <h3>🌊 Wave Simulation (3D)</h3>
        <ul>
          <li><b>Q:</b> Formula for wave frequency? <br /><b>A:</b> f = v/λ</li>
          <li><b>Q:</b> What does amplitude control? <br /><b>A:</b> Height of crests and troughs.</li>
          <li><b>Q:</b> What does wave speed control? <br /><b>A:</b> How fast the wave propagates.</li>
          <li><b>Q:</b> What is the period formula? <br /><b>A:</b> T = 1/f</li>
          <li><b>Q:</b> What is a crest and trough? <br /><b>A:</b> Crest = highest point, trough = lowest point.</li>
        </ul>
      </div>

      {/* Spring-Mass */}
      <div className="qa-section">
        <h3>🌀 Spring-Mass Oscillator (3D)</h3>
        <ul>
          <li><b>Q:</b> What is Hooke’s Law? <br /><b>A:</b> F = -kx</li>
          <li><b>Q:</b> Frequency formula? <br /><b>A:</b> f = (1/2π) √(k/m)</li>
          <li><b>Q:</b> What is period formula? <br /><b>A:</b> T = 1/f</li>
          <li><b>Q:</b> Effect of increasing k? <br /><b>A:</b> Faster oscillations (higher frequency).</li>
          <li><b>Q:</b> Effect of increasing m? <br /><b>A:</b> Slower oscillations (lower frequency).</li>
        </ul>
      </div>
    </div>
  );
}
