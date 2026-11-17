"use client";
import { useEffect, useMemo, useRef } from "react";
import { Group, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { makeBrandGeometry, type BrandCharacter } from "@/lib/brand-geometry";
import { smooth, type Quality } from "@/lib/effects";
import useSceneSample from "./useSceneSample";

export default function BrandLetter({
  letter,
  quality,
  height,
  position,
  rotation = [0, 0, 0],
  from,
  to,
}: {
  letter: BrandCharacter;
  quality: Quality;
  height: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  from: number;
  to: number;
}) {
  const group = useRef<Group>(null);
  const face = useRef<MeshPhysicalMaterial>(null);
  const edge = useRef<MeshStandardMaterial>(null);
  const geometry = useMemo(
    () => makeBrandGeometry(letter, quality),
    [letter, quality],
  );
  // A primitive geometry is explicitly owned here; R3F owns the two materials.
  useEffect(() => () => geometry.dispose(), [geometry]);
  useSceneSample((p) => {
    const opacity =
      smooth(from, from + 0.025, p) * (1 - smooth(to - 0.025, to, p));
    if (group.current) group.current.visible = opacity > 0.001;
    if (face.current) {
      face.current.opacity = opacity;
      face.current.depthWrite = opacity > 0.98;
    }
    if (edge.current) {
      edge.current.opacity = opacity;
      edge.current.depthWrite = opacity > 0.98;
    }
  });
  return (
    <group
      ref={group}
      name={`brand-letter-${letter}`}
      position={position}
      rotation={rotation}
      scale={height}
    >
      <mesh>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          ref={face}
          attach="material-0"
          color="#652D2B"
          roughness={0.62}
          clearcoat={quality === "low" ? 0 : 0.18}
          clearcoatRoughness={0.5}
          transparent
        />
        <meshStandardMaterial
          ref={edge}
          attach="material-1"
          color="#B89A62"
          roughness={0.6}
          metalness={0.28}
          transparent
        />
      </mesh>
    </group>
  );
}
