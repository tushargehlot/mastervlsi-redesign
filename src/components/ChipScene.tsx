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
      {/* PCB substrate — dark ceramic board */}
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.08, 3.6]} />
        <meshStandardMaterial color="#06121f" metalness={0.48} roughness={0.44} emissive="#03111f" emissiveIntensity={0.35} />
      </mesh>
      {/* Chip die — black silicon */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.3, 2.2]} />
        <meshStandardMaterial color="#050912" metalness={0.82} roughness={0.24} emissive="#061d35" emissiveIntensity={0.55} />
        <Edges color="#2ee8ff" threshold={15} />
      </mesh>
      {/* Inner holographic layers */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[1.7, 0.02, 1.7]} />
        <meshStandardMaterial color="#20dfff" emissive="#20dfff" emissiveIntensity={1.8} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[1.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#6ff6ff" emissive="#6ff6ff" emissiveIntensity={2.4} transparent opacity={0.8} />
      </mesh>
      {/* Center AI beacon */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#e8fbff" emissive="#8b5cff" emissiveIntensity={2.4} />
      </mesh>
      {/* Pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={p.pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.06, 0.18]} />
          <meshStandardMaterial color="#9feeff" metalness={1} roughness={0.18} emissive="#0d7a9c" emissiveIntensity={0.35} />
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
      <meshStandardMaterial color="#20dfff" emissive="#20dfff" emissiveIntensity={2.8} />
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
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 6, 5]} intensity={58} color="#9feeff" />
      <pointLight position={[-4, 3, -4]} intensity={42} color="#20dfff" />
      <pointLight position={[0, 2, 0]} intensity={14} color="#8b5cff" />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <ChipBoard />
        <RingGlow />
      </Float>
    </Canvas>
  );
}
