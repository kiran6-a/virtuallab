import React from "react";
import "./Theory.css";

export default function Theory() {
  return (
    <div className="theory-page">
      <h2 className="theory-title">📘 Physics Lab Theory</h2>
      <p className="theory-subtitle">
        Deeper explanations of concepts, formulas, and real-life examples for each experiment.
      </p>

      {/* Projectile Motion */}
      <div className="theory-section">
        <h3>🎯 Projectile Motion</h3>
        <p>
          Projectile motion refers to the curved path followed by an object under the influence 
          of gravity alone, after being given an initial velocity. Its horizontal component of 
          velocity remains constant, while the vertical velocity changes due to gravity. The path 
          traced is a parabola. The range is given by <code>R = (u² · sin(2θ)) / g</code>, and 
          maximum range occurs at 45°. The maximum height is <code>H = (u² · sin²θ) / 2g</code>, 
          and time of flight is <code>T = (2u · sinθ) / g</code>. Importantly, mass of the object 
          does not affect the trajectory (neglecting air resistance). Real-life examples include 
          throwing a ball, firing a cannon, or water jets in fountains. 
        </p>
      </div>

      {/* Pendulum */}
      <div className="theory-section">
        <h3>⏳ Pendulum</h3>
        <p>
          A simple pendulum consists of a heavy bob suspended by a light, inextensible string from 
          a fixed point. When displaced slightly, it oscillates back and forth in simple harmonic 
          motion (SHM). The time period of oscillation is <code>T = 2π √(L/g)</code>, which depends 
          only on the length of the string (L) and gravitational acceleration (g). The mass of the 
          bob does not affect the period. The small-angle approximation (θ ≤ 10°) is assumed for 
          the formula to hold accurately. Increasing the length increases the period, while reducing 
          length makes oscillations faster. Real-world examples include pendulum clocks and swings 
          in playgrounds.
        </p>
      </div>

      {/* Lens */}
      <div className="theory-section">
        <h3>🔍 Lens Simulation</h3>
        <p>
          A convex lens converges light rays, while a concave lens diverges them. The relation 
          between object distance (u), image distance (v), and focal length (f) is given by the 
          thin lens formula: <code>1/f = 1/v + 1/u</code>. Magnification is given by 
          <code> M = v/u</code>. If the object is placed beyond 2f, the image is real, inverted, 
          and diminished. At 2f, the image is real, inverted, and same size. Between f and 2f, 
          the image is real, inverted, and magnified. At f, the image is at infinity. Inside the 
          focal length, a virtual, erect, and magnified image is formed. Applications include 
          microscopes, cameras, magnifying glasses, and telescopes.
        </p>
      </div>

      {/* Wave */}
      <div className="theory-section">
        <h3>🌊 Wave Simulation</h3>
        <p>
          A wave is a disturbance that transfers energy from one point to another without the 
          transport of matter. Waves can be mechanical (sound, water) or electromagnetic (light, 
          radio). Key properties include wavelength (λ), frequency (f), amplitude (A), and speed 
          (v). The relation is <code>v = fλ</code>, and the period is <code>T = 1/f</code>. 
          Amplitude controls the height of the wave, while frequency and speed determine how fast 
          it oscillates. Crests are the highest points and troughs are the lowest. In nature, 
          waves explain ocean tides, sound vibrations, and even seismic activity during earthquakes.
        </p>
      </div>

      {/* Spring-Mass */}
      <div className="theory-section">
        <h3>🌀 Spring-Mass Oscillator</h3>
        <p>
          A spring-mass system consists of a mass attached to a spring that follows Hooke’s law: 
          <code> F = -kx </code>, where k is the spring constant. Displacing the mass and releasing 
          it produces simple harmonic motion (SHM). The frequency of oscillation is given by 
          <code> f = (1 / 2π) √(k/m) </code>, and the time period is <code>T = 1/f</code>. A stiffer 
          spring (larger k) increases frequency, while a heavier mass (larger m) decreases it. The 
          system is used in shock absorbers, car suspensions, and vibration isolation devices. Energy 
          oscillates between potential energy in the spring and kinetic energy of the moving mass, 
          demonstrating conservation of energy in oscillatory systems.
        </p>
      </div>
    </div>
  );
}
