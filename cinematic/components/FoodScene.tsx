"use client";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { journey } from "@/lib/journey";
import DepthLayer from "./DepthLayer";
export default function FoodScene({ mobile }: { mobile: boolean }) {
  return (
    <>
      <DepthLayer
        src="sate.webp"
        position={[3.3, -0.3, 0]}
        size={[10, 8]}
        round={1}
        rotation={[0, -0.12, -0.12]}
        end={0.2}
      />
      <Suspense fallback={null}>
        <DepthLayer
          src="rendang.webp"
          position={[-4, -0.7, -5]}
          size={[5.5, 4.4]}
          round={1}
          rotation={[0.12, 0.35, 0.12]}
          start={0.07}
          end={0.3}
        />
        <DepthLayer
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
export function SharingScene({ mobile }: { mobile: boolean }) {
  const table = useRef<Group>(null);
  useFrame(() => {
    if (table.current)
      table.current.rotation.x =
        ((1 - MathUtils.smoothstep(journey.progress, 0.34, 0.47)) * Math.PI) /
        2;
  });
  return (
    <group ref={table} position={[0, 0, -26]}>
      <DepthLayer
        src="sharing.webp"
        position={[0, 0.02, 0]}
        size={[7, 5.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        round={1}
      />
      <DepthLayer
        src="sate.webp"
        position={[-5, 0.1, 1]}
        size={[4, 3.2]}
        rotation={[-Math.PI / 2, 0, -0.4]}
        round={1}
      />
      <DepthLayer
        src="rendang.webp"
        position={[4.5, 0.14, -1.8]}
        size={[4, 3.2]}
        rotation={[-Math.PI / 2, 0, 0.3]}
        round={1}
      />
      {!mobile && (
        <DepthLayer
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
