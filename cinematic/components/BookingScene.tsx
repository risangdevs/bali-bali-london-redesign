"use client";
import { type Quality } from "@/lib/effects";
import DepthLayer from "./DepthLayer";
export default function BookingScene({
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
        src="sharing.webp"
        start={0.64}
        position={[mobile ? 1.5 : 4.5, 0.1, -65]}
        size={mobile ? [7, 5.6] : [10, 8]}
        round={1}
        rotation={[0, -0.2, 0.1]}
      />
      <DepthLayer
        quality={quality}
        hot
        src="rice.webp"
        start={0.64}
        position={[-4, -3, -63]}
        size={[4, 3.2]}
        round={1}
      />
    </group>
  );
}
