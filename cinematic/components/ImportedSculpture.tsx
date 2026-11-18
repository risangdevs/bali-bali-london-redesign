"use client";
import { useRef } from "react";
import useImportedModel from "./useImportedModel";
import { Group } from "three";
import { HOME } from "@/lib/content";
import { culturalLayout } from "@/lib/cultural-layout";
import { smooth, type Quality } from "@/lib/effects";
import useSceneSample from "./useSceneSample";

/** Imported assets are prepared offline in canonical sculpture coordinates.
 * Instances own fade materials; cached geometry/textures have counted ownership.
 */
export default function ImportedSculpture({
  mobile,
  quality,
  symbol,
  manifest,
}: {
  mobile: boolean;
  quality: Quality;
  symbol: "gateway" | "penjor" | "jepun";
  manifest: { variants: Record<Quality, { file: string }> };
}) {
  const url = `${HOME}models/${manifest.variants[quality].file}`;
  const owned = useImportedModel(url);
  const group = useRef<Group>(null);
  const layout = culturalLayout(symbol, mobile);
  useSceneSample((p) => {
    const opacity =
      smooth(layout.from, layout.from + 0.025, p) *
      (1 - smooth(layout.to - 0.025, layout.to, p));
    if (group.current) group.current.visible = opacity > 0.001;
    owned.materials.forEach((material) => {
      material.opacity = opacity;
      material.depthWrite = opacity > 0.98;
    });
  });
  return (
    <group
      ref={group}
      name={`cultural-${symbol}-scan`}
      position={layout.position}
      rotation={layout.rotation}
      scale={layout.scale}
    >
      <primitive object={owned.root} dispose={null} />
    </group>
  );
}
