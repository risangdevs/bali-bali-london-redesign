"use client";
import { DoubleSide } from "three";
export default function SceneTransition({ mobile }: { mobile: boolean }) {
  return (
    <group position={[0, 0, -13]}>
      <mesh>
        <torusGeometry args={[3.1, 0.68, mobile ? 12 : 24, mobile ? 48 : 96]} />
        <meshStandardMaterial
          color="#652D2B"
          roughness={0.7}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.21]}>
        <torusGeometry args={[3.15, 0.026, 8, 96]} />
        <meshStandardMaterial color="#B89A62" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.65]}>
        <torusGeometry args={[3.1, 0.28, 12, 64]} />
        <meshStandardMaterial color="#B66D4D" roughness={0.9} />
      </mesh>
    </group>
  );
}
