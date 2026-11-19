"use client";
import { Suspense } from "react";
import FlowerModel from "./FlowerModel";
import { type Quality } from "@/lib/effects";
import DepthLayer from "./DepthLayer";
import DwarapalaModel from "./DwarapalaModel";
import { heritagePhotos } from "@/lib/photo-layout";
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
      {heritagePhotos(mobile).map((photo) => (
        <DepthLayer key={photo.id} {...photo} quality={quality} />
      ))}
      <Suspense fallback={null}>
        <DwarapalaModel mobile={mobile} quality={quality} />
      </Suspense>
      <Suspense fallback={null}>
        <FlowerModel mobile={mobile} quality={quality} />
      </Suspense>
    </group>
  );
}
