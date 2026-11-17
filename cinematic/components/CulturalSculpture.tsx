"use client";
import { useEffect, useMemo, useRef } from "react";
import { DoubleSide, Group, MeshStandardMaterial } from "three";
import {
  culturalPalettes,
  makeCulturalGeometry,
  type CulturalSymbol,
} from "@/lib/cultural-geometry";
import { smooth, type Quality } from "@/lib/effects";
import useSceneSample from "./useSceneSample";

export default function CulturalSculpture({
  symbol,
  quality,
  scale,
  position,
  rotation,
  from,
  to,
}: {
  symbol: CulturalSymbol;
  quality: Quality;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  from: number;
  to: number;
}) {
  const group = useRef<Group>(null);
  const materials = useRef<(MeshStandardMaterial | null)[]>([]);
  const geometry = useMemo(
    () => makeCulturalGeometry(symbol, quality),
    [symbol, quality],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useSceneSample((p) => {
    const opacity =
      smooth(from, from + 0.025, p) * (1 - smooth(to - 0.025, to, p));
    if (group.current) group.current.visible = opacity > 0.001;
    materials.current.forEach((material) => {
      if (!material) return;
      material.opacity = opacity;
      material.depthWrite = opacity > 0.98;
    });
  });
  return (
    <group
      ref={group}
      name={`cultural-${symbol}`}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <mesh>
        <primitive attach="geometry" object={geometry} />
        {culturalPalettes[symbol].map((color, i) => (
          <meshStandardMaterial
            key={i}
            ref={(material) => {
              materials.current[i] = material;
            }}
            attach={`material-${i}`}
            color={color}
            roughness={symbol === "jepun" ? 0.6 : 0.86}
            metalness={symbol === "foliage" && i === 1 ? 0.2 : 0}
            side={DoubleSide}
            transparent
          />
        ))}
      </mesh>
    </group>
  );
}
