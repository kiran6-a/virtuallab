import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./Experiment.css";

// 🎯 Projectile Motion (Ball)
function Ball({ velocity, angle, scaleFactor }) {
  const ref = useRef();
  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vy = velocity * Math.sin(rad);
  const flightTime = (2 * vy) / g;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() % flightTime;
    const x = vx * t * scaleFactor;
    const y = (vy * t - 0.5 * g * t * t) * scaleFactor;
    if (ref.current) ref.current.position.set(x, y >= 0 ? y : 0, 0);
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function Projectile3D() {
  const [velocity, setVelocity] = useState(15);
  const [angle, setAngle] = useState(45);
  const [showTheory, setShowTheory] = useState(false);

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;

  // Physics calculations
  const range = (velocity * velocity * Math.sin(2 * rad)) / g;
  const maxHeight = (velocity * velocity * Math.pow(Math.sin(rad), 2)) / (2 * g);
  const timeOfFlight = (2 * velocity * Math.sin(rad)) / g;

  // Dynamic grid scaling
  const gridSizeX = Math.max(20, range * 1.2);
  const gridSizeY = Math.max(20, maxHeight * 1.5);
  const scaleFactor =
    range > 40 || maxHeight > 20
      ? Math.min(40 / range, 20 / maxHeight)
      : 1;

  return (
    <div className="experiment-card">
      <h2 className="experiment-title">🎯 Projectile Motion (3D)</h2>

      {/* Controls */}
      <div className="experiment-controls">
        <label>
          Velocity (m/s): {velocity}
          <input
            type="range"
            min="5"
            max="60"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
          />
        </label>
        <label>
          Angle (°): {angle}
          <input
            type="range"
            min="15"
            max="80"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      </div>

      {/* 📊 Results (center aligned) */}
      <div className="experiment-results" style={{ textAlign: "center" }}>
        <p>
          <b>Range (R):</b> {range.toFixed(2)} m
        </p>
        <p>
          <b>Max Height (H):</b> {maxHeight.toFixed(2)} m
        </p>
        <p>
          <b>Time of Flight (T):</b> {timeOfFlight.toFixed(2)} s
        </p>

        <h3>📘 Formula</h3>
        <p>R = (u² · sin(2θ)) / g</p>
        <p>H = (u² · sin²θ) / (2g)</p>
        <p>T = (2u · sinθ) / g</p>

        {/* Toggle explanation */}
        <button
          onClick={() => setShowTheory((s) => !s)}
          style={{ marginTop: 8 }}
        >
          {showTheory ? "Hide Explanation" : "Show Explanation"}
        </button>

        {showTheory && (
          <div
            className="theory-box"
            style={{ marginTop: 8, textAlign: "justify" }}
          >
            <h4>📝 Explanation</h4>
            <p>
              Projectile motion occurs when an object is launched into the air
              and moves under the influence of gravity. Its horizontal velocity
              remains constant, while the vertical velocity decreases due to
              gravity, creating a parabolic trajectory.
            </p>
            <p>
              The <b>range (R)</b> depends on velocity and angle, with maximum
              range at 45°. The <b>maximum height (H)</b> depends on the
              vertical component of velocity. The <b>time of flight (T)</b> is
              determined by how long gravity takes to bring the projectile back
              to the ground.
            </p>
          </div>
        )}
      </div>

      {/* 3D Scene */}
      <Canvas style={{ height: "450px", background: "#eef" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ball velocity={velocity} angle={angle} scaleFactor={scaleFactor} />

        {/* Grid and axes */}
        <gridHelper args={[gridSizeX, 20]} position={[gridSizeX / 2, 0, 0]} />
        <axesHelper args={[5]} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
