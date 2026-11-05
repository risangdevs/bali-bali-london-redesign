"use client";
import DepthLayer from "./DepthLayer";
export default function BookingScene() {
  return (
    <group>
      <DepthLayer
        src="sharing.webp"
        position={[4.5, 0.1, -65]}
        size={[10, 8]}
        round={1}
        rotation={[0, -0.2, 0.1]}
      />
      <DepthLayer
        src="rice.webp"
        position={[-4, -3, -63]}
        size={[4, 3.2]}
        round={1}
      />
    </group>
  );
}
