"use client";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { AmbientLight, Color, DirectionalLight } from "three";
import { smooth, type Quality } from "@/lib/effects";
import useSceneSample from "./useSceneSample";

export default function AtmosphericLighting({ quality }: { quality: Quality }) {
  const { scene, gl } = useThree();
  const ambient = useRef<AmbientLight>(null);
  const key = useRef<DirectionalLight>(null);
  const colors = useMemo(
    () => ({
      ivory: new Color("#f4ebdd"),
      heritage: new Color("#e0cab0"),
      evening: new Color("#e5d7c5"),
      current: new Color(),
    }),
    [],
  );
  useSceneSample((p) => {
    const heritage = smooth(0.49, 0.59, p) * (1 - smooth(0.66, 0.77, p));
    const evening = smooth(0.66, 0.77, p) * (1 - smooth(0.83, 0.93, p));
    colors.current
      .copy(colors.ivory)
      .lerp(colors.heritage, heritage)
      .lerp(colors.evening, evening);
    scene.background = colors.current;
    gl.toneMappingExposure = 1 - 0.025 * heritage;
    if (ambient.current) ambient.current.intensity = 1.8 - 0.12 * evening;
    if (key.current) key.current.intensity = 2.4 + 0.15 * heritage;
  });
  return (
    <>
      <ambientLight ref={ambient} intensity={1.8} />
      <directionalLight
        ref={key}
        position={[5, 8, 10]}
        intensity={2.4}
        color="#fff3df"
      />
      {quality === "high" && (
        <hemisphereLight args={["#fff8ed", "#b66d4d", 0.3]} />
      )}
    </>
  );
}
