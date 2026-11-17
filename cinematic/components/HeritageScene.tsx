"use client";
import { type Quality } from "@/lib/effects";
import DepthLayer from "./DepthLayer";
import BrandLetter from "./BrandLetter";
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
        end={0.74}
        position={[mobile ? 1.4 : 3.6, 1, -44]}
        size={mobile ? [3.2, 4.2] : [5, 6.5]}
        rotation={[0, -0.22, 0]}
      />
      <DepthLayer
        quality={quality}
        src="sharing.webp"
        end={0.74}
        position={[mobile ? 2.5 : 6, -0.6, -47]}
        size={[5, 4]}
        rotation={[0, -0.35, 0]}
      />
      <BrandLetter
        letter="L"
        quality={quality}
        height={mobile ? 2 : 6.6}
        position={[mobile ? 0.2 : 2.9, mobile ? -0.4 : 0, -42.5]}
        rotation={[0, -0.12, 0]}
        from={0.49}
        to={0.655}
      />
      <BrandLetter
        letter="I"
        quality={quality}
        height={mobile ? 1.35 : 3.1}
        position={[mobile ? 0.2 : 1.6, mobile ? 0.15 : 1.4, -41.5]}
        rotation={[0, 0.12, 0]}
        from={0.625}
        to={0.745}
      />
    </group>
  );
}
