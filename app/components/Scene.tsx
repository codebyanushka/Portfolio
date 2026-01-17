"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useMouse } from "../lib/useMouse";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function GalaxyParticles() {
  const points = useRef<THREE.Points>(null);

  const mouse = useMouse();

  const count = 4000;
  const radius = 12;

  // base positions (never change)
  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  // working positions
  const positions = useMemo(() => basePositions.slice(), [basePositions]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = 0.4;
      arr[i * 3 + 1] = 0.5;
      arr[i * 3 + 2] = 1;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!points.current) return;

    const pos =
      points.current.geometry.attributes.position.array as Float32Array;
    const col =
      points.current.geometry.attributes.color.array as Float32Array;

    const mx = mouse.x * radius;
    const my = mouse.y * radius;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      const bx = basePositions[ix];
      const by = basePositions[ix + 1];
      const bz = basePositions[ix + 2];

      const dx = bx - mx;
      const dy = by - my;
      const dz = bz;

      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const influence = Math.max(0, 1 - dist / 12);


     pos[ix] += dx * influence * 0.025;
pos[ix + 1] += dy * influence * 0.025;
pos[ix + 2] += dz * influence * 0.01;

      // ✨ smooth return to base
      pos[ix] += (bx - pos[ix]) * 0.02;
      pos[ix + 1] += (by - pos[ix + 1]) * 0.02;
      pos[ix + 2] += (bz - pos[ix + 2]) * 0.02;

      // ✨ glow color response
      col[ix] = 0.3 + influence * 0.7;
      col[ix + 1] = 0.2 + influence * 0.5;
      col[ix + 2] = 1;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;

    // cinematic slow drift
    points.current.rotation.y += 0.0005;

  });
//m
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas
  camera={{ position: [0, 0, 10], fov: 75 }}
  className="absolute inset-0 z-0"
>
  <GalaxyParticles />

  <EffectComposer>
    <Bloom
      intensity={1.2}
      luminanceThreshold={0}
      luminanceSmoothing={0.9}
    />
  </EffectComposer>
</Canvas>

  );
}
