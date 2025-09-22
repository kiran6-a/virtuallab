import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Experiment.css";

// 🌊 Wave Surface Component
function WaveSurface({ waveSpeed, amplitude }) {
  const meshRef = useRef();
  const count = 100; // resolution
  const sep = 0.15;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(count * sep, count * sep, count, count);
    geo.rotateX(-Math.PI / 2); // make it horizontal
    return geo;
  }, [count, sep]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y =
        Math.sin((x + time * waveSpeed) * 2) * amplitude +
        Math.cos((z + time * waveSpeed) * 2) * amplitude;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals(); // ✅ update shading
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* ✅ Realistic water effect */}
      <meshStandardMaterial
        color="#1E90FF"
        metalness={0.3}
        roughness={0.2}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Wave3D() {
  const [waveSpeed, setWaveSpeed] = useState(1.0);
  const [amplitude, setAmplitude] = useState(0.2);
  const [showTheory, setShowTheory] = useState(false);

  const wavelength = 2 * Math.PI;
  const frequency = waveSpeed / wavelength;
  const period = frequency > 0 ? 1 / frequency : Infinity;

  return (
    <div className="experiment-card">
      <h2 className="experiment-title">🌊 Wave Simulation (3D)</h2>

      {/* Controls */}
      <div className="experiment-controls">
        <label>
          Wave Speed: {waveSpeed.toFixed(2)}
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={waveSpeed}
            onChange={(e) => setWaveSpeed(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Amplitude: {amplitude.toFixed(2)}
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
        </label>

        {/* Results */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <p>
            <b>Frequency (f):</b>{" "}
            {isFinite(frequency) ? frequency.toFixed(2) : "—"} Hz
          </p>
          <p>
            <b>Period (T):</b> {isFinite(period) ? period.toFixed(2) : "—"} s
          </p>
        </div>

        <h3 style={{ textAlign: "center" }}>📘 Formula</h3>
        <p style={{ textAlign: "center" }}>f = v / λ (here λ = 2π)</p>
        <p style={{ textAlign: "center" }}>T = 1 / f</p>

        {/* Toggle explanation */}
        <button
          onClick={() => setShowTheory((s) => !s)}
          style={{ marginTop: 8 }}
        >
          {showTheory ? "Hide Explanation" : "Show Explanation"}
        </button>

        {showTheory && (
          <div className="theory-box" style={{ marginTop: 8, textAlign: "justify" }}>
            <h4>📝 Explanation</h4>
            <p>
              This simulation shows a surface wave, where the crests and troughs
              move dynamically. The amplitude controls the height of the waves,
              and the wave speed affects how fast they move.
            </p>
            <p>
              The <b>frequency</b> is the number of oscillations per second,
              calculated as f = v / λ. The <b>period</b> is the time for one
              full cycle: T = 1 / f.
            </p>
            <p>
              Increasing wave speed makes the ripples move faster, while
              increasing amplitude makes the waves taller but doesn’t affect
              their speed.
            </p>
          </div>
        )}
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 6, 10], fov: 45 }}
        style={{ height: "420px" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />

        <WaveSurface waveSpeed={waveSpeed} amplitude={amplitude} />

        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
}
