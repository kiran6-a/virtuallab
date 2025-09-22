import React, { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Experiment.css";

function LensMesh({ y }) {
  return (
    <group position={[0, y, 0]}>
      {/* Rotate cylinder so lens looks vertical (convex lens style) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.6, 1.6, 0.4, 64]} />
        <meshPhysicalMaterial color="#4db6ac" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function RayLines({ u, f, axisY }) {
  const offsets = [-0.9, -0.45, 0, 0.45, 0.9];
  const invDiff = 1 / f - 1 / u;
  let v = Math.abs(invDiff) < 1e-9 ? Infinity : 1 / invDiff;

  const rays = useMemo(() => {
    return offsets.map((off) => {
      const objPos = new THREE.Vector3(-u, axisY + off, 0);
      const lensPt = new THREE.Vector3(0, axisY + off, 0);

      const yImage = isFinite(v)
        ? -(v / u) * off + axisY
        : off >= 0
        ? axisY + 200
        : axisY - 200;

      const imagePt = new THREE.Vector3(
        v === Infinity ? 2000 : v,
        yImage,
        0
      );

      const seg1 = new THREE.BufferGeometry().setFromPoints([objPos, lensPt]);
      const seg2 = new THREE.BufferGeometry().setFromPoints([lensPt, imagePt]);

      return { seg1, seg2, objPos, imagePt, isReal: isFinite(v) && v > 0 };
    });
  }, [u, f, axisY, v]);

  return (
    <>
      {rays.map((r, i) => (
        <group key={i}>
          <line geometry={r.seg1}>
            <lineBasicMaterial attach="material" color="#ffd54f" linewidth={2} />
          </line>
          <line geometry={r.seg2}>
            <lineBasicMaterial attach="material" color="#ffd54f" linewidth={2} />
          </line>
        </group>
      ))}

      {/* Object marker (cone, upright) */}
      <mesh position={[-u, axisY, 0]}>
        <coneGeometry args={[0.18, 0.6, 16]} />
        <meshStandardMaterial color="#ff6f61" />
      </mesh>

      {/* Real image marker */}
      {isFinite(v) && v > 0 && (
        <mesh position={[v, axisY, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      )}

      {/* Virtual image dashed line */}
      {isFinite(v) && v < 0 && (
        <line
          geometry={new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(v, axisY, 0),
            new THREE.Vector3(0, axisY, 0),
          ])}
        >
          <lineDashedMaterial
            attach="material"
            color="#999"
            dashSize={0.2}
            gapSize={0.1}
          />
        </line>
      )}
    </>
  );
}

export default function Lens3D() {
  const [objectDistance, setObjectDistance] = useState(6);
  const [focalLength, setFocalLength] = useState(2);
  const [showTheory, setShowTheory] = useState(false);

  const axisY = 1.5;
  const u = Math.max(0.1, objectDistance);
  const f = Math.max(0.05, focalLength);

  const invDiff = 1 / f - 1 / u;
  let v = Math.abs(invDiff) < 1e-9 ? Infinity : 1 / invDiff;

  const extentX = Math.max(
    8,
    Math.abs(u) * 1.4,
    isFinite(v) ? Math.abs(v) * 1.4 : 8
  );
  const gridSize = Math.max(20, extentX);

  return (
    <div className="experiment-card">
      <h2 className="experiment-title">🔍 Lens Simulation (3D)</h2>

      <div className="experiment-controls">
        <label>
          Object Distance (u): {u.toFixed(2)} m
          <input
            type="range"
            min="2"
            max="20"
            step="0.1"
            value={objectDistance}
            onChange={(e) => setObjectDistance(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Focal Length (f): {f.toFixed(2)} m
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.1"
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
          />
        </label>

        <div style={{ marginTop: 8, textAlign: "center" }}>
          <p>
            <b>Image Distance (v):</b>{" "}
            {v === Infinity
              ? "Infinity (no finite image)"
              : `${v.toFixed(2)} m`}
          </p>
        </div>

        <div style={{ marginTop: 8, textAlign: "center" }}>
          <h3>📘 Formula</h3>
          <p>
            Thin lens equation: <code>1/f = 1/v + 1/u</code>
          </p>
          <p>
            Rearranged: <code>v = 1 / (1/f − 1/u)</code>
          </p>
          <p>
            Sign convention: v &gt; 0 → real image (right of lens);
            v &lt; 0 → virtual image (left).
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
              A convex lens refracts rays from an object at distance <b>u</b> to
              form an image at distance <b>v</b>. We use the thin-lens equation
              above.
            </p>
            <p>
              Rays and markers are drawn above the grid (optical axis at y ={" "}
              {axisY}) for clarity.
            </p>
            <p>
              Move the sliders to see how changing <b>u</b> and <b>f</b> alters
              whether the image is real or virtual, and how far it forms from
              the lens.
            </p>
          </div>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 4, 18], fov: 45 }} // Camera straight-on
        style={{ height: "460px" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={0.7} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[gridSize, gridSize]} />
          <meshStandardMaterial color="#f5f7fa" />
        </mesh>

        <LensMesh y={axisY} />
        <RayLines u={u} f={f} axisY={axisY} />

        <gridHelper args={[gridSize, 20, "#999", "#ddd"]} position={[0, 0, 0]} />
        <axesHelper args={[3]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
