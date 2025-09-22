import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Experiment.css";

// 🔧 Spring-Mass System
function SpringMass({ k, amplitude }) {
  const massRef = useRef();
  const springRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const displacement = amplitude * Math.cos(Math.sqrt(k) * t);

    // Move mass
    if (massRef.current) {
      massRef.current.position.x = displacement;
    }

    // Update spring geometry
    if (springRef.current) {
      const points = [];
      const turns = 20;
      const length = displacement + 3; // base spring length + stretch

      for (let i = 0; i <= turns * 20; i++) {
        const x = (length / (turns * 20)) * i - 3; // spring starts at -3
        const y = 0.2 * Math.sin(i * 0.5);
        const z = 0.2 * Math.cos(i * 0.5);
        points.push(new THREE.Vector3(x, y, z));
      }

      springRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <>
      {/* Spring */}
      <line ref={springRef}>
        <bufferGeometry />
        <lineBasicMaterial color="black" linewidth={2} />
      </line>

      {/* Mass (block) */}
      <mesh ref={massRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Base Wall (tall support) */}
      <mesh position={[-3.6, 0.75, 0]}>
        <boxGeometry args={[0.8, 3, 2]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
}

// 🎯 Main Experiment
export default function SpringMass3D() {
  const [k, setK] = useState(4); // spring constant
  const [amplitude, setAmplitude] = useState(1); // displacement amplitude
  const [showTheory, setShowTheory] = useState(false);

  const mass = 1; // assume 1 kg
  const frequency = (1 / (2 * Math.PI)) * Math.sqrt(k / mass);
  const period = 1 / frequency;

  return (
    <div className="experiment-card">
      <h2 className="experiment-title">🌀 Spring-Mass Oscillator (3D)</h2>

      {/* Controls */}
      <div className="experiment-controls">
        <label>
          Spring Constant (k): {k}
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Amplitude: {amplitude.toFixed(1)}
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
        </label>

        {/* Results */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <p>
            <b>Oscillation Frequency (f):</b> {frequency.toFixed(2)} Hz
          </p>
          <p>
            <b>Period (T):</b> {period.toFixed(2)} s
          </p>
        </div>

        {/* Formula */}
        <h3 style={{ textAlign: "center" }}>📘 Formula</h3>
        <p style={{ textAlign: "center" }}>f = (1 / 2π) √(k / m)</p>
        <p style={{ textAlign: "center" }}>T = 1 / f</p>

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
              A spring-mass system consists of a block of mass <b>m</b> attached
              to a spring with constant <b>k</b>. When displaced from
              equilibrium, the spring exerts a restoring force following Hooke’s
              Law: <code>F = -kx</code>.
            </p>
            <p>
              The motion is simple harmonic, with angular frequency
              <code> ω = √(k/m) </code>. Thus the frequency is
              <code> f = (1 / 2π) √(k/m) </code> and the period is
              <code> T = 1/f </code>.
            </p>
            <p>
              Increasing the spring constant <b>k</b> makes oscillations faster,
              while increasing the mass <b>m</b> slows them down.
            </p>
          </div>
        )}
      </div>

      {/* 3D Scene */}
      <Canvas style={{ height: "420px", background: "#f0f8ff" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Spring + Mass + Base Wall */}
        <SpringMass k={k} amplitude={amplitude} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
