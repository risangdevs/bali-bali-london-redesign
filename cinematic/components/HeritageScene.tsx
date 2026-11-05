"use client";
import DepthLayer from "./DepthLayer";
// Abstract photographic installation, deliberately not a fabricated restaurant interior.
export default function HeritageScene() {
  return (
    <group>
      <DepthLayer
        src="sate.webp"
        position={[3.6, 1, -44]}
        size={[5, 6.5]}
        rotation={[0, -0.22, 0]}
      />
      <DepthLayer
        src="sharing.webp"
        position={[6, -0.6, -47]}
        size={[5, 4]}
        rotation={[0, -0.35, 0]}
      />
      <mesh position={[-6, 0, -48]}>
        <boxGeometry args={[0.14, 12, 3]} />
        <meshStandardMaterial color="#652D2B" />
      </mesh>
      <mesh position={[6.2, 0, -50]}>
        <boxGeometry args={[0.14, 12, 3]} />
        <meshStandardMaterial color="#652D2B" />
      </mesh>
    </group>
  );
}
