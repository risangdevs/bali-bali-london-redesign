"use client";
import { Suspense } from "react";
import FlowerModel from "./FlowerModel";
import { type Quality } from "@/lib/effects";
import DepthLayer from "./DepthLayer";
import CulturalSculpture from "./CulturalSculpture";
import { culturalLayout } from "@/lib/cultural-layout";
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
        start={0.49}
        src="sate.webp"
        end={0.74}
        position={[mobile ? 3.2 : 7.5, 1, -44]}
        size={mobile ? [3.2, 4.2] : [5, 6.5]}
        rotation={[0, -0.22, 0]}
      />
      <DepthLayer
        quality={quality}
        start={0.49}
        src="sharing.webp"
        end={0.74}
        position={[mobile ? -2.2 : -0.6, -0.6, -47]}
        size={mobile ? [3.6, 2.88] : [5, 4]}
        rotation={[0, -0.35, 0]}
      />
      <CulturalSculpture
        {...culturalLayout("foliage", mobile)}
        quality={quality}
      />
      <Suspense fallback={null}>
        <FlowerModel mobile={mobile} quality={quality} />
      </Suspense>
    </group>
  );
}
