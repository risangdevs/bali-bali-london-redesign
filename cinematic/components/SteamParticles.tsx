"use client";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Points, ShaderMaterial } from "three";
import { journey } from "@/lib/journey";
import {
  atmosphereVisibility,
  qualitySettings,
  type Quality,
} from "@/lib/effects";
import { steamFragment, steamVertex } from "@/lib/shaders";
import useSceneSample from "./useSceneSample";

export default function SteamParticles({
  quality,
  visibility,
}: {
  quality: Quality;
  visibility: (progress: number) => number;
}) {
  const points = useRef<Points>(null);
  const material = useRef<ShaderMaterial>(null);
  const { size, gl } = useThree();
  const count = qualitySettings[quality].particles;
  const seeds = useMemo(() => {
    const values = new Float32Array(count * 4);
    // Stable seeds prevent particles jumping when responsive layouts/quality change.
    for (let i = 0; i < values.length; i++)
      values[i] = ((i * 16807 + 137) % 65521) / 65521;
    return values;
  }, [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uPointScale: { value: 1 },
      uQuality: { value: 2 },
    }),
    [],
  );
  useSceneSample((p) => {
    const opacity =
      visibility(p) *
      atmosphereVisibility(p) *
      atmosphereVisibility(journey.progress) *
      (quality === "high" ? 0.105 : 0.075);
    if (points.current)
      points.current.visible = opacity > 0.002 && quality !== "low";
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uOpacity.value = opacity;
    u.uTime.value = journey.time;
    u.uPointScale.value = size.height * gl.getPixelRatio() * 1.15;
    u.uQuality.value = qualitySettings[quality].noise;
  });
  if (!count) return null;
  return (
    <points ref={points} frustumCulled={false} renderOrder={4}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 4]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
        vertexShader={steamVertex}
        fragmentShader={steamFragment}
      />
    </points>
  );
}
