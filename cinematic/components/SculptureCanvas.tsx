"use client";
import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, MeshStandardMaterial, PerspectiveCamera } from "three";
import { HOME } from "@/lib/content";
import {
  makeCulturalGeometry,
  culturalPalettes,
} from "@/lib/cultural-geometry";
import type { Quality } from "@/lib/effects";
import {
  sampleInterlude,
  type SculptureName,
  type SculptureBounds,
} from "@/lib/interlude";
import gateway from "@/lib/gateway-model.json";
import penjor from "@/lib/penjor-model.json";
import flower from "@/lib/flower-model.json";
import useImportedModel from "./useImportedModel";
import modelBounds from "@/lib/sculpture-bounds.json";
export type InterludeMotion = { progress: number; invalidate?: () => void };
function Rig({
  bounds,
  gate,
  motion,
  onReady,
}: {
  bounds: SculptureBounds;
  gate: number[];
  motion: InterludeMotion;
  onReady: () => void;
}) {
  const { invalidate, size } = useThree();
  useEffect(() => {
    motion.invalidate = invalidate;
    onReady();
    invalidate();
    return () => {
      motion.invalidate = undefined;
    };
  }, [invalidate, motion, onReady]);
  useFrame(({ camera }) => {
    const view = sampleInterlude(
      bounds,
      gate,
      size.width / size.height,
      motion.progress,
    );
    camera.position.fromArray(view.position);
    camera.lookAt(...view.target);
    const lens = camera as PerspectiveCamera;
    if (lens.fov !== view.fov) {
      lens.fov = view.fov;
      lens.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();
  });
  return null;
}
function ImportedModel({
  symbol,
  quality,
  motion,
  onReady,
}: {
  symbol: Exclude<SculptureName, "foliage">;
  quality: Quality;
  motion: InterludeMotion;
  onReady: () => void;
}) {
  const manifest = { gateway, penjor, jepun: flower }[symbol];
  const owned = useImportedModel(
    `${HOME}models/${manifest.variants[quality].file}`,
  );
  const bounds = modelBounds[symbol];
  return (
    <>
      <primitive object={owned.root} dispose={null} />
      <Rig
        bounds={bounds}
        gate={manifest.gate}
        motion={motion}
        onReady={onReady}
      />
    </>
  );
}
function Foliage({
  quality,
  motion,
  onReady,
}: {
  quality: Quality;
  motion: InterludeMotion;
  onReady: () => void;
}) {
  const geometry = useMemo(
    () => makeCulturalGeometry("foliage", quality),
    [quality],
  );
  const materials = useMemo(
    () =>
      culturalPalettes.foliage.map(
        (color, i) =>
          new MeshStandardMaterial({
            color,
            vertexColors: true,
            roughness: 0.66,
            metalness: i === 1 ? 0.2 : 0,
            side: DoubleSide,
          }),
      ),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials],
  );
  const bounds = modelBounds.foliage;
  return (
    <>
      <mesh geometry={geometry} material={materials} dispose={null} />
      <Rig bounds={bounds} gate={[0, 0]} motion={motion} onReady={onReady} />
    </>
  );
}
function Monitor({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}
export default function SculptureCanvas({
  symbol,
  motion,
  onReady,
  onFailure,
}: {
  symbol: SculptureName;
  motion: InterludeMotion;
  onReady: () => void;
  onFailure: () => void;
}) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const hints = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const quality: Quality =
    hints.connection?.saveData ||
    (hints.deviceMemory && hints.deviceMemory <= 2)
      ? "low"
      : mobile
        ? "medium"
        : "high";
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)}
      camera={{ fov: 38, position: [0, 0, 3], near: 0.01, far: 30 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
    >
      <Monitor onFailure={onFailure} />
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 10]} intensity={2.4} color="#fff3df" />
      <Suspense fallback={null}>
        {symbol === "foliage" ? (
          <Foliage quality={quality} motion={motion} onReady={onReady} />
        ) : (
          <ImportedModel
            symbol={symbol}
            quality={quality}
            motion={motion}
            onReady={onReady}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
