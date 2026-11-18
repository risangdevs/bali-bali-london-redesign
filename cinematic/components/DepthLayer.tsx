"use client";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide, SRGBColorSpace, ShaderMaterial, Vector2 } from "three";
import { journey } from "@/lib/journey";
import { asset } from "@/lib/content";
import {
  atmosphereVisibility,
  qualitySettings,
  type Quality,
} from "@/lib/effects";
import { photoVisibility } from "@/lib/motion";
import { smooth } from "@/lib/effects";
import { photoFragment, photoVertex } from "@/lib/shaders";
import useSceneSample from "./useSceneSample";
import useOwnedTexture from "./useOwnedTexture";
import SteamParticles from "./SteamParticles";

type Props = {
  src: string;
  position: [number, number, number];
  size?: [number, number];
  rotation?: [number, number, number];
  round?: number;
  start?: number;
  end?: number;
  hot?: boolean;
  quality?: Quality;
};
/** Analytic plate relief, not an invented food depth map. Cover UVs preserve photo aspect. */
export default function DepthLayer({
  src,
  position,
  size = [6, 4.8],
  rotation = [0, 0, 0],
  round = 0,
  start = -1,
  end = 2,
  hot = false,
  quality = "high",
}: Props) {
  const texture = useTexture(asset(src));
  texture.colorSpace = SRGBColorSpace;
  useOwnedTexture(texture, asset(src));
  const material = useRef<ShaderMaterial>(null);
  const shadowMaterial = useRef<ShaderMaterial>(null);
  const image = texture.image as { width: number; height: number };
  const photoAspect = image.width / image.height;
  const planeAspect = size[0] / size[1];
  const uniforms = useMemo(
    () => ({
      photo: { value: texture },
      rounded: { value: round },
      visibility: { value: 1 },
      uCover: {
        value: new Vector2(
          Math.min(1, planeAspect / photoAspect),
          Math.min(1, photoAspect / planeAspect),
        ),
      },
      uRelief: { value: quality === "low" || !round ? 0 : size[0] * 0.014 },
      uTime: { value: 0 },
      uHeat: { value: 0 },
      uQuality: { value: qualitySettings[quality].noise },
      uWarmth: { value: 1 },
      uScroll: { value: 0 },
      uScene: { value: 0 },
      uTransition: { value: 0 },
    }),
    [texture, round, photoAspect, planeAspect, quality, size[0]],
  );
  const visibility = (p: number) => photoVisibility(p, start, end);
  useSceneSample((p) => {
    if (shadowMaterial.current)
      shadowMaterial.current.uniforms.visibility.value = visibility(p);
    if (!material.current) return;
    const u = material.current.uniforms;
    u.visibility.value = visibility(p);
    u.uTime.value = journey.time;
    u.uScroll.value = p;
    u.uScene.value = (p * 6) % 1;
    u.uTransition.value = 1 - atmosphereVisibility(p);
    u.uHeat.value = hot
      ? atmosphereVisibility(p) *
        atmosphereVisibility(journey.progress) *
        (quality === "high" ? 1 : 0.55)
      : 0;
    u.uWarmth.value = 1 + smooth(0.5, 0.7, p) * 0.25;
  });
  const segments = round ? qualitySettings[quality].segments : 1;
  return (
    <group position={position} rotation={rotation}>
      {!!round && quality !== "low" && (
        <mesh position={[0.04, -0.06, -0.035]}>
          <planeGeometry args={[size[0] * 1.06, size[1] * 1.06]} />
          <shaderMaterial
            ref={shadowMaterial}
            uniforms={uniforms}
            transparent
            side={DoubleSide}
            depthWrite={false}
            toneMapped={false}
            vertexShader={photoVertex}
            fragmentShader={`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`}
          />
        </mesh>
      )}
      <mesh>
        <planeGeometry args={[size[0], size[1], segments, segments]} />
        <shaderMaterial
          key={quality}
          ref={material}
          uniforms={uniforms}
          defines={{ EFFECT_QUALITY: qualitySettings[quality].noise }}
          transparent
          side={DoubleSide}
          depthWrite={false}
          toneMapped={false}
          vertexShader={photoVertex}
          fragmentShader={photoFragment}
        />
      </mesh>
      {hot && quality !== "low" && (
        <SteamParticles quality={quality} visibility={visibility} />
      )}
    </group>
  );
}
