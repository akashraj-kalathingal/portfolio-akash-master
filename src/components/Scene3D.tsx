"use client";

/**
 * Scene3D — the centerpiece of the hero.
 *
 * Renders an abstracted distributed-system topology: a cluster of nodes
 * (icosahedra) connected by faint lines, slowly orbiting, with floating
 * particles in the depth. Camera responds to mouse position with subtle
 * parallax.
 *
 * Design notes:
 *  - The geometry is intentionally low-poly. The aesthetic comes from
 *    lighting and motion, not detail. This keeps it fast everywhere.
 *  - All animation is frame-loop driven, so prefers-reduced-motion
 *    handling is done by short-circuiting the loop, not by gating
 *    animations after the fact.
 *  - The Canvas is wrapped in dynamic import on the page so SSR doesn't
 *    try to instantiate WebGL.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ---------- Nodes + connections (the topology) -------------------------- */

type NodeSpec = { position: [number, number, number]; size: number; color: string };

function makeTopology(seed = 7): { nodes: NodeSpec[]; edges: [number, number][] } {
  // Deterministic pseudo-random so SSR/CSR agree.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const palette = ["#7dd3c0", "#6cb6ff", "#fbbf77"];
  const NODE_COUNT = 9;
  const nodes: NodeSpec[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Distribute on a rough sphere of radius ~3
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 2.4 + rand() * 1.0;
    nodes.push({
      position: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ],
      size: 0.12 + rand() * 0.18,
      color: palette[i % palette.length]!,
    });
  }

  // Connect each node to its 2 nearest neighbours.
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const a = nodes[i]!.position;
      const b = nodes[j]!.position;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      dists.push({ j, d });
    }
    dists.sort((x, y) => x.d - y.d);
    for (let k = 0; k < 2; k++) {
      const j = dists[k]!.j;
      const key: [number, number] = i < j ? [i, j] : [j, i];
      if (!edges.some((e) => e[0] === key[0] && e[1] === key[1])) {
        edges.push(key);
      }
    }
  }
  return { nodes, edges };
}

function Node({ spec }: { spec: NodeSpec }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.2 + spec.position[0]) * 0.08;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.3}>
      <mesh ref={ref} position={spec.position}>
        <icosahedronGeometry args={[spec.size, 0]} />
        <meshStandardMaterial
          color={spec.color}
          emissive={spec.color}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.5}
          flatShading
        />
      </mesh>
      {/* Halo */}
      <mesh position={spec.position}>
        <sphereGeometry args={[spec.size * 1.8, 16, 16]} />
        <meshBasicMaterial color={spec.color} transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

function Edges({
  nodes,
  edges,
}: {
  nodes: NodeSpec[];
  edges: [number, number][];
}) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      const pa = nodes[a]!.position;
      const pb = nodes[b]!.position;
      positions.set(pa, i * 6);
      positions.set(pb, i * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [nodes, edges]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#7dd3c0" transparent opacity={0.22} />
    </lineSegments>
  );
}

/* ---------- Particles (depth field) ------------------------------------- */

function ParticleField() {
  const points = useMemo(() => {
    const COUNT = 400;
    const positions = new Float32Array(COUNT * 3);
    let s = 42;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    for (let i = 0; i < COUNT; i++) {
      // Distribute in a torus-ish region around the camera
      const r = 8 + rand() * 12;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.015;
      ref.current.rotation.x += dt * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        size={0.025}
        color="#a8d5cc"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/* ---------- Cluster (rotates whole thing) ------------------------------- */

function Cluster() {
  const { nodes, edges } = useMemo(() => makeTopology(), []);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, dt) => {
    if (!group.current) return;
    // Slow autorotation
    group.current.rotation.y += dt * 0.08;
    // Mouse-driven tilt with smoothing
    const targetX = pointer.y * 0.25;
    const targetZ = -pointer.x * 0.15;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <Node key={i} spec={n} />
      ))}
      <Edges nodes={nodes} edges={edges} />
    </group>
  );
}

/* ---------- Reduced motion fallback ------------------------------------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  }, []);
  return reduced;
}

/* ---------- Public Scene component -------------------------------------- */

export default function Scene3D() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ background: "transparent" }}
      // Pause render loop when reduced motion is on
      frameloop={reduced ? "demand" : "always"}
    >
      <color attach="background" args={["#020203"]} />
      <fog attach="fog" args={["#020203", 5, 20]} />

      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#6cb6ff" />
      <pointLight position={[4, 3, -2]} intensity={1.5} color="#fbbf77" />

      <Suspense fallback={null}>
        <Cluster />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
