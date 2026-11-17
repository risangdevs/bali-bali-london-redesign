"use client";
import { type Quality } from "@/lib/effects";
import DepthLayer from "./DepthLayer";
// Abstract photographic installation, deliberately not a fabricated restaurant interior.
export default function HeritageScene({
  quality,
  mobile,
}: {
  quality: Quality;
  mobile: boolean;
}) {
  return (
    <group>
      <DepthLayer
        quality={quality}
        src="sate.webp"
        position={[mobile ? 1.4 : 3.6, 1, -44]}
        size={mobile ? [3.2, 4.2] : [5, 6.5]}
        rotation={[0, -0.22, 0]}
      />
      <DepthLayer
        quality={quality}
        src="sharing.webp"
        position={[mobile ? 2.5 : 6, -0.6, -47]}
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
