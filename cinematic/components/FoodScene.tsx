"use client";
import { Suspense, useRef } from "react";
import useSceneSample from "./useSceneSample";
import { type Quality } from "@/lib/effects";
import { Group, MathUtils } from "three";
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
      <DepthLayer
        quality={quality}
        hot
        src="sate.webp"
        position={[mobile ? 0.9 : 3.3, mobile ? -0.5 : -0.3, 0]}
        size={mobile ? [7.8, 6.24] : [10, 8]}
        round={1}
        rotation={[0, -0.12, -0.12]}
        end={0.2}
      />
      <Suspense fallback={null}>
        <DepthLayer
          quality={quality}
          hot
          src="rendang.webp"
          position={[-4, -0.7, -5]}
          size={[5.5, 4.4]}
          round={1}
          rotation={[0.12, 0.35, 0.12]}
          start={0.07}
          end={0.3}
        />
        <DepthLayer
          quality={quality}
          src="vegetables.webp"
          position={[4.5, 0.4, -8]}
          size={[5.3, 4.2]}
          round={1}
          rotation={[-0.1, -0.3, -0.18]}
          start={0.08}
          end={0.33}
        />
        {!mobile && (
          <DepthLayer
            quality={quality}
            src="rice.webp"
            position={[-3.9, 2, -10]}
            size={[4, 3.2]}
            round={1}
            rotation={[0.15, 0.25, -0.2]}
            start={0.1}
            end={0.35}
          />
        )}
      </Suspense>
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
  useSceneSample((p) => {
    if (table.current)
      table.current.rotation.x =
        ((1 - MathUtils.smoothstep(p, 0.34, 0.47)) * Math.PI) / 2;
  });
  return (
    <group ref={table} position={[0, 0, -26]}>
      <DepthLayer
        quality={quality}
        src="sharing.webp"
        position={[0, 0.02, 0]}
        size={[7, 5.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        round={1}
      />
      <DepthLayer
        quality={quality}
        hot
        src="sate.webp"
        position={[-5, 0.1, 1]}
        size={[4, 3.2]}
        rotation={[-Math.PI / 2, 0, -0.4]}
        round={1}
      />
      <DepthLayer
        quality={quality}
        hot
        src="rendang.webp"
        position={[4.5, 0.14, -1.8]}
        size={[4, 3.2]}
        rotation={[-Math.PI / 2, 0, 0.3]}
        round={1}
      />
      {!mobile && (
        <DepthLayer
          quality={quality}
          src="vegetables.webp"
          position={[1, 0.12, 4.1]}
          size={[3.4, 2.7]}
          rotation={[-Math.PI / 2, 0, -0.25]}
          round={1}
        />
      )}
    </group>
  );
}
