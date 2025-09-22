import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Experiment.css";

// 🎯 Pendulum Bob + Rope
function Bob({ length, amplitude, pivot }) {
  const ref = useRef();
  const lineRef = useRef();
  const g = 9.8;
  const [time, setTime] = useState(0);

  useFrame((_, delta) => {
    setTime((t) => t + delta);
    const omega = Math.sqrt(g / length); // angular frequency
    const theta = amplitude * Math.cos(omega * time);

    const x = length * Math.sin(theta);
    const y = -length * Math.cos(theta);
    const bobPos = new THREE.Vector3(pivot.x + x, pivot.y + y, 0);

    if (ref.current) ref.current.position.copy(bobPos);

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array;
      positions[0] = pivot.x;
      positions[1] = pivot.y;
      positions[2] = pivot.z;
      positions[3] = bobPos.x;
      positions[4] = bobPos.y;
      positions[5] = bobPos.z;
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Bob */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Rope */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              pivot.x,
              pivot.y,
              pivot.z,
              pivot.x,
              pivot.y - length,
              pivot.z,
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="black" />
      </line>
    </>
  );
}

// 🎯 Support Stand
function Stand({ pivot }) {
  return (
    <group>
      {/* Vertical pole */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 0.2]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Pivot marker */}
      <mesh position={[pivot.x, pivot.y, pivot.z]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

// 🎯 Main Pendulum Experiment
export default function Pendulum3D() {
  const [length, setLength] = useState(4);
  const [amplitude, setAmplitude] = useState(0.3);
  const [showTheory, setShowTheory] = useState(false);

  const pivot = { x: 0, y: 5, z: 0 };
  const g = 9.8;

  // 🧮 Calculations
  const period = 2 * Math.PI * Math.sqrt(length / g);
  const frequency = 1 / period;

  return (
    <div className="experiment-card">
      <h2 className="experiment-title">⏳ Pendulum (3D Simulation)</h2>

      {/* Controls */}
      <div className="experiment-controls">
        <label>
          Length (m): {length}
          <input
            type="range"
            min="2"
            max="8"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          Amplitude (rad): {amplitude.toFixed(2)}
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.01"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
        </label>

        {/* Results */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <p>
            <b>Period (T):</b> {period.toFixed(2)} s
          </p>
          <p>
            <b>Frequency (f):</b> {frequency.toFixed(2)} Hz
          </p>
        </div>

        {/* 📘 Formula (centered) */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <h3>📘 Formula</h3>
          <p>
            <b>Period (small-angle):</b> <code>T = 2π √(L / g)</code>
          </p>
          <p>
            <b>Frequency:</b> <code>f = 1 / T</code>
          </p>
        </div>

        <button
          onClick={() => setShowTheory((s) => !s)}
          style={{ marginTop: 8 }}
        >
          {showTheory ? "Hide Explanation" : "Show Explanation"}
        </button>

        {showTheory && (
          <div className="theory-box" style={{ marginTop: 8 }}>
            <h4>📝 Explanation</h4>
            <p>
              A simple pendulum consists of a bob suspended from a fixed pivot
              by a string of length <b>L</b>. For small angular amplitudes
              (θ ≲ 10°) the motion approximates simple harmonic motion.
            </p>
            <p>
              The angular frequency is ω = √(g / L). The period is T = 2π √(L/g).
              Frequency is the reciprocal of the period. If amplitude becomes
              large, the small-angle approximation breaks down and the true
              period increases slightly.
            </p>
            <p>
              Increasing <b>L</b> → slower swings. Decreasing <b>L</b> → faster swings.
            </p>
          </div>
        )}
      </div>

      {/* 3D Canvas */}
      <Canvas
        style={{ height: "450px", width: "100%", background: "#eef" }}
        camera={{ position: [0, 3, 10], fov: 50 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Stand + Pendulum */}
        <Stand pivot={pivot} />
        <Bob length={length} amplitude={amplitude} pivot={pivot} />

        <OrbitControls />
        <gridHelper args={[12, 12]} />
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
}
