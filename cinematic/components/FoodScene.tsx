"use client";
import { useRef } from "react";
import { Group } from "three";
import type { Quality } from "@/lib/effects";
import { foodPhotos, sharingPhotos, sharingTilt } from "@/lib/photo-layout";
import useSceneSample from "./useSceneSample";
import DepthLayer from "./DepthLayer";
export default function FoodScene({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  return (
    <>
      {foodPhotos(mobile).map((photo) => (
        <DepthLayer key={photo.id} {...photo} quality={quality} />
      ))}
    </>
  );
}
export function SharingScene({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  const table = useRef<Group>(null);
  // Parent transforms must be sampled before photo framing in both compositor views.
  useSceneSample((p) => {
    if (table.current) table.current.rotation.x = sharingTilt(p);
  }, -20);
  return (
    <group ref={table} position={[0, 0, -26]}>
      {sharingPhotos(mobile).map((photo) => (
        <DepthLayer key={photo.id} {...photo} quality={quality} />
      ))}
    </group>
  );
}
