import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Edges } from "@react-three/drei";

function ChipBoard() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    group.current.rotation.x = -0.35 + Math.sin(t * 0.25) * 0.05;
  });

  // Pins
  const pins = useMemo(() => {
    const arr: { pos: [number, number, number] }[] = [];
    const n = 18;
    for (let i = 0; i < n; i++) {
      const x = -1.5 + (3 * i) / (n - 1);
      arr.push({ pos: [x, -0.05, 1.05] });
      arr.push({ pos: [x, -0.05, -1.05] });
      arr.push({ pos: [1.05, -0.05, -1.5 + (3 * i) / (n - 1)] });
      arr.push({ pos: [-1.05, -0.05, -1.5 + (3 * i) / (n - 1)] });
    }
    return arr;
  }, []);

  return (
    <group ref={group}>
      {/* Substrate */}
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.08, 3.6]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Chip die */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.3, 2.2]} />
        <meshStandardMaterial color="#0d0d10" metalness={0.85} roughness={0.25} emissive="#1a0405" emissiveIntensity={0.4} />
        <Edges color="#e50914" threshold={15} />
      </mesh>
      {/* Inner glowing layers */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[1.7, 0.02, 1.7]} />
        <meshStandardMaterial color="#e50914" emissive="#e50914" emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[1.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#ff3344" emissive="#ff3344" emissiveIntensity={2.2} />
      </mesh>
      {/* Center beacon */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff1a2e" emissiveIntensity={3} />
      </mesh>
      {/* Pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={p.pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.06, 0.18]} />
          <meshStandardMaterial color="#d4d4d8" metalness={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function RingGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.2, 0.018, 16, 128]} />
      <meshStandardMaterial color="#e50914" emissive="#e50914" emissiveIntensity={2.5} />
    </mesh>
  );
}

export default function ChipScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 2.6, 4.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 6, 5]} intensity={50} color="#ffffff" />
      <pointLight position={[-4, 3, -4]} intensity={40} color="#e50914" />
      <pointLight position={[0, 2, 0]} intensity={12} color="#ff3344" />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <ChipBoard />
        <RingGlow />
      </Float>
    </Canvas>
  );
}
